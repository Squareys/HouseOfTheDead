import * as WL from "@wonderlandengine/api"
import { wlUtils } from './wlUtils';

// console.log(WL);
const leveldata = {
    rooms: [
        // [
        //     [{ orientation: 'N', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'N', wall: 'A', floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: 'WC', floor: 'W', ceiling: 'W' }],
        //     [{ orientation: 'W', wall: 'A', floor: 'W', ceiling: 'W' }, { floor: 'W', ceiling: 'W', light: '' }, { orientation: 'E', wall: 'W', floor: 'W', ceiling: 'W' }],
        //     [{ orientation: 'W', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: 'A', floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: 'WC', floor: 'W', ceiling: 'W' }]
        // ],
        [
            [{ orientation: 'N', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'N', wall: ['WI', 'W', 'A'], floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: 'WC', floor: 'W', ceiling: 'W' }],
            [{ orientation: 'W', wall: 'A', floor: 'W', ceiling: 'W' }, { floor: 'W', ceiling: 'W', light: '' }, { orientation: 'E', wall: ['WI', 'W', 'A'], floor: 'W', ceiling: 'W' }],
            [{ orientation: 'W', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: ['WI', 'W'], floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: 'WC', floor: 'W', ceiling: 'W' }]
        ],
        [
            [{ orientation: 'N', wall: ['WCA', 'WC'], floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: 'WC', floor: 'W', ceiling: 'W' }],
            [{ orientation: 'W', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: ['WC', 'WCA'], floor: 'W', ceiling: 'W' }]
        ],
        [
            [{ orientation: 'W', wall: ['WE', 'WEA'], floor: 'W', ceiling: 'W' }, { floor: 'W', ceiling: 'W', wall: ['WSA', 'WWSA'], orientation: ['N', 'S'] }, { orientation: 'E', wall: ['WE', 'WEA'], floor: 'W', ceiling: 'W' }],
        ],
        [
            [{ orientation: 'N', wall: ['WEA', 'WE'], floor: 'W', ceiling: 'W' }, {}],
            [{ orientation: 'W', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: ['WEA', 'WE'], floor: 'W', ceiling: 'W' }],
        ]
    ]
}

/**
 * @type {WL.Component}
 */
const mapgenComponent = {
    init() {
        this.walls = {};
        this.floors = {};
        this.ceilings = {};
        this.mapCenter = { x: 64, y: 64 };
    },

    start() {
        this.generateRoomVariations();
        this.readLevelComponents();
        this.createPixelMap();
        this.first = true;

        let exits = this.addRoom();
        console.log(exits);
        for (let i = 0; i < 10; i++) {
            exits = this.generateRooms(exits);
        }
        // let exits3 = [];
        // console.log(exits2);
        // exits2.forEach(exit => {
        //     if (exit)
        //         exits3 = exits3.concat(this.addRoom(exit));
        // });
        // let exits4 = [];
        // exits3.forEach(exit => {
        //     if (exit)
        //         exits4 = exits4.concat(this.addRoom(exit));
        // });
        // let exits5 = [];
        // exits4.forEach(exit => {
        //     if (exit)
        //         exits5 = exits5.concat(this.addRoom(exit));
        // });



        //console.log(exits, exits2, exits3, exits4, exits5);
    },
    generateRooms(exits) {
        let exits2 = [];
        exits.forEach(exit => {
            if (exit)
                exits2 = exits2.concat(this.addRoom(exit));
        });
        return exits2;
    },
    // pick a random room template and clone it.
    // try placing the cloned template at the position based on the exit
    // when a random tile is choosen, write that to the cloned template.
    // store the location of the exits of the room.
    // if the room fits, add it to the level.
    // run addRoom for every exit.   
    addRoom(startingExit) {
        let roomFound = false;
        let numTries = 60;
        let room, roomExits, roomPosition;
        let availableExits = [];
        let roomId = new Date().getTime();
        if (startingExit) {
            console.log(`-{ starting ${roomId}}-`);
            do {
                room = JSON.parse(JSON.stringify(leveldata.rooms[~~(Math.random() * leveldata.rooms.length)]));
                roomPosition = { x: 0, y: 0 };
                roomExits = this.findExitsInRoom(room);
                if (roomExits.length > 0) {
                    let validExit = this.findValidExit(startingExit, roomExits);
                    if (validExit) {
                        roomPosition = { x: startingExit.x - validExit.x, y: startingExit.y - validExit.y };
                        let areaIsClear = this.checkAreaIsClear(room, roomPosition);
                        if (areaIsClear) {
                            console.log('area is clear');
                            roomFound = true;
                            break;
                        }
                    }
                }
                numTries--
            } while (numTries > 0);

            if (!roomFound) {
                console.log(`no room found (${roomId})`);
                //  debugger;
                return;
            }
        } else {
            do {
                room = JSON.parse(JSON.stringify(leveldata.rooms[~~(Math.random() * leveldata.rooms.length)]));
                roomPosition = { x: 0, y: 0 };
                roomExits = this.findExitsInRoom(room);
            } while (roomExits.length === 0);
        }

        console.log(`room found ${roomId}`);
        room.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const x = roomPosition.x + cellIndex;
                const y = roomPosition.y + rowIndex;
                if (cell.wall) {
                    const wallToPlace = wlUtils.cloneObject(this.walls[cell.wall]);
                    wallToPlace.resetTranslationRotation();
                    const q = wlUtils.rotationFromDirection(cell.orientation);
                    wallToPlace.rotate(q);
                    wallToPlace.setTranslationWorld([x * 3, 0, y * 3]);
                }
                if (cell.floor) {
                    const floorCode = Array.isArray(cell.floor) ? cell.floor[~~(Math.random() * cell.floor.length)] : cell.floor;
                    const floorToPlace = wlUtils.cloneObject(this.floors[floorCode]);
                    floorToPlace.resetTranslationRotation();
                    floorToPlace.setTranslationWorld([x * 3, 0, y * 3]);
                }

                if (cell.ceiling) {
                    const ceilingCode = Array.isArray(cell.ceiling) ? cell.ceiling[~~(Math.random() * cell.ceiling.length)] : cell.ceiling;
                    const ceilingToPlace = wlUtils.cloneObject(this.ceilings[ceilingCode]);
                    ceilingToPlace.resetTranslationRotation();
                    ceilingToPlace.setTranslationWorld([x * 3, 0, y * 3]);
                }
                console.log(this.hasPixel(x, y));
                if (this.isArch(cell)) {
                    this.drawPixel(x, y, '#F00');
                    var d = wlUtils.translateFromDirection(x, y, cell.orientation);
                    availableExits.push({ x: x + d.x, y: y + d.y, o: cell.orientation });
                    //this.drawPixel(x + d.x, y + d.y, '#400');
                } else {
                    this.drawPixel(x, y, '#888');
                }
            })
        })
        console.log(`exits:${availableExits.length} (${roomId})`);
        return availableExits;




    },
    checkAreaIsClear(room, roomPosition) {
        let areaIsClear = true;
        room.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell.floor) {
                    const x = roomPosition.x + cellIndex;
                    const y = roomPosition.y + rowIndex;
                    if (this.hasPixel(x, y)) {
                        areaIsClear = false;
                    }
                }
            });
        });
        return areaIsClear;
    },
    findValidExit(startingExit, roomExits) {
        let validExit;
        if (startingExit.o === 'N') {
            validExit = roomExits.find(exit => exit.o == 'S');
        }
        if (startingExit.o === 'S') {
            validExit = roomExits.find(exit => exit.o == 'N');
        }
        if (startingExit.o === 'E') {
            validExit = roomExits.find(exit => exit.o == 'W');
        }
        if (startingExit.o === 'W') {
            validExit = roomExits.find(exit => exit.o == 'E');
        }
        return validExit;
    },
    isArch(cell) {
        return cell.wall && !!~cell.wall.indexOf('A');
    },

    readLevelComponents() {
        this.readLevelComponent(this.walls, 'Walls');
        this.readLevelComponent(this.floors, 'Floors');
        this.readLevelComponent(this.ceilings, 'Ceilings');
        // const wallsObject = wlUtils.findChild(this.object, 'Walls');
        // for (let i = 0; i < wallsObject.children.length; i++) {
        //     const wall = wallsObject.children[i];
        //     wall.setTranslationWorld([0, -10000, 0]);
        //     const wallComponent = wall.getComponent('tile-descriptor');
        //     this.walls[wallComponent.code] = wall;
        // }

        // const floorsObject = wlUtils.findChild(this.object, 'Floors');
        // for (let i = 0; i < floorsObject.children.length; i++) {
        //     const floor = floorsObject.children[i];
        //     floor.setTranslationWorld([0, -10000, 0]);
        //     const floorComponent = floor.getComponent('tile-descriptor');
        //     this.floors[floorComponent.code] = floor;
        // }
    },
    readLevelComponent(target, category) {
        const tilesObject = wlUtils.findChild(this.object, category);
        for (let i = 0; i < tilesObject.children.length; i++) {
            const tile = tilesObject.children[i];
            tile.setTranslationWorld([0, -10000, 0]);
            const tileComponent = tile.getComponent('tile-descriptor');
            target[tileComponent.code] = tile;
        }
    },
    createPixelMap() {
        var mapCanvas = document.createElement('canvas');
        mapCanvas.style.position = 'absolute';
        mapCanvas.style.top = '0px';
        mapCanvas.style.left = '0px';
        mapCanvas.style.zIndex = '100';
        mapCanvas.width = 128;
        mapCanvas.height = 128;

        // Temp during development
        // mapCanvas.style.width = '1024px';
        // mapCanvas.style.height = '1024px';
        // mapCanvas.style.imageRendering = 'pixelated';
        // document.body.appendChild(mapCanvas);
        // END

        this.mapContext = mapCanvas.getContext('2d');
        this.mapContext.fillStyle = "rgba(0, 0, 0, 1)";
        this.mapContext.fillRect(0, 0, 128, 128);
        this.mapContext
    },
    drawPixel(x, y, color) {
        this.mapContext.fillStyle = color;
        this.mapContext.fillRect(x + this.mapCenter.x, y + this.mapCenter.y, 1, 1);
    },
    hasPixel(x, y) {
        const pixel = this.mapContext.getImageData(x + this.mapCenter.x, y + this.mapCenter.y, 1, 1).data;
        return pixel[0] > 0 || pixel[1] > 0 || pixel[2] > 0;
    },

    readPixel(x, y) {
        var data = this.mapContext.getImageData(x + this.mapCenter.x, y + this.mapCenter.y, 1, 1).data;
        var rgb = [data[0], data[1], data[2]];
        return rgb;
    },
    generateRoomVariations() {
        //create 3 mirrored variations of the room
        let pl = leveldata.rooms.length;
        for (let i = 0; i < pl; i++) {
            //Flip E->W
            let clone = JSON.parse(JSON.stringify(leveldata.rooms[i]));
            for (let j = 0; j < clone.length; j++) {
                clone[j] = clone[j].reverse();
                clone[j].forEach((cell, cellIndex) => {
                    if (cell.wall &&
                        (!Array.isArray(cell.wall) && ~cell.wall.indexOf('C'))
                        || (Array.isArray(cell.wall) && ~cell.wall[0].indexOf('C'))) {
                        switch (cell.orientation) {
                            case 'N': cell.orientation = 'E'; break;
                            case 'E': cell.orientation = 'N'; break;
                            case 'S': cell.orientation = 'W'; break;
                            case 'W': cell.orientation = 'S'; break;
                        }
                    } else {
                        if (cell.orientation === 'W') cell.orientation = 'E';
                        else if (cell.orientation === 'E') cell.orientation = 'W';
                    };
                });
            }
            leveldata.rooms.push(clone);

            //Flip N->S
            let clone2 = JSON.parse(JSON.stringify(leveldata.rooms[i]));
            clone2 = clone2.reverse();
            for (let j = 0; j < clone2.length; j++) {
                clone2[j].forEach(cell => {
                    if (cell.wall &&
                        (!Array.isArray(cell.wall) && ~cell.wall.indexOf('C'))
                        || (Array.isArray(cell.wall) && ~cell.wall[0].indexOf('C'))) {
                        switch (cell.orientation) {
                            case 'N': cell.orientation = 'W'; break;
                            case 'E': cell.orientation = 'S'; break;
                            case 'S': cell.orientation = 'E'; break;
                            case 'W': cell.orientation = 'N'; break;
                        }
                    } else {
                        if (cell.orientation === 'S') cell.orientation = 'N';
                        else if (cell.orientation === 'N') cell.orientation = 'S';
                    }
                });
            }
            leveldata.rooms.push(clone2);

            let clone3 = JSON.parse(JSON.stringify(clone2));
            clone3 = clone3.reverse();
            for (let j = 0; j < clone3.length; j++) {
                clone3[j] = clone3[j].reverse();
                clone3[j].forEach(cell => {
                    switch (cell.orientation) {
                        case 'N': cell.orientation = 'S'; break;
                        case 'E': cell.orientation = 'W'; break;
                        case 'S': cell.orientation = 'N'; break;
                        case 'W': cell.orientation = 'E'; break;
                    }
                });
            }
            leveldata.rooms.push(clone3);
        }
    },
    findExitsInRoom(room) {
        let roomExits = [];
        room.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell.wall) {
                    let wallCode = Array.isArray(cell.wall) ? cell.wall[~~(Math.random() * cell.wall.length)] : cell.wall;
                    room[rowIndex][cellIndex].wall = wallCode;
                    let orientation = Array.isArray(cell.orientation) ? cell.orientation[~~(Math.random() * cell.orientation.length)] : cell.orientation;
                    room[rowIndex][cellIndex].orientation = orientation;
                    if (~wallCode.indexOf('A')) {
                        roomExits.push({ x: cellIndex, y: rowIndex, o: cell.orientation });
                    }
                }
            })
        });
        return roomExits;
    }
}


/**
 * @typedef {Object} params
 * @property {WL.CustomParameter} width The width of the map to generate in roomparts of 3m (integer); defaults to 30
 * @property {WL.CustomParameter} height The width of the map to generate in roomparts of 3m (integer); default to 30
 */
/** @type params */
const params = {
    roomPlacementTries: { type: WL.Type.Int, default: 1 },
    width: { type: WL.Type.Int, default: 30 },
    height: { type: WL.Type.Int, default: 30 },
}

WL.registerComponent('mapgenerator', params, mapgenComponent);
