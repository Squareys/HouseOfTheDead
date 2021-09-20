import * as WL from "@wonderlandengine/api"
import { wlUtils } from './wlUtils';

// console.log(WL);
const leveldata = {
    room: [
        [{ orientation: 'W', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'N', wall: ['WI', 'W'], floor: 'W', ceiling: 'W' }, { orientation: 'N', wall: 'WC', floor: 'W', ceiling: 'W' }],
        [{ orientation: 'W', wall: 'A', floor: 'W', ceiling: 'W' }, { floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: ['WI', 'W'], floor: 'W', ceiling: 'W' }],
        [{ orientation: 'S', wall: 'WC', floor: 'W', ceiling: 'W' }, { orientation: 'S', wall: ['WI', 'W'], floor: 'W', ceiling: 'W' }, { orientation: 'E', wall: 'WC', floor: 'W', ceiling: 'W' }]
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
    },

    start() {
        this.readLevelComponents();
        leveldata.room.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell.wall) {
                    const wallCode = Array.isArray(cell.wall) ? cell.wall[~~(Math.random() * cell.wall.length)] : cell.wall;
                    const wallToPlace = wlUtils.cloneObject(this.walls[wallCode]);
                    wallToPlace.resetTranslationRotation();
                    const q = wlUtils.rotationFromDirection(cell.orientation);
                    wallToPlace.rotate(q);
                    wallToPlace.setTranslationWorld([cellIndex * 3, 0, rowIndex * 3]);
                }

                if (cell.floor) {
                    const floorCode = Array.isArray(cell.floor) ? cell.floor[~~(Math.random() * cell.floor.length)] : cell.floor;
                    const floorToPlace = wlUtils.cloneObject(this.floors[floorCode]);
                    floorToPlace.resetTranslationRotation();
                    floorToPlace.setTranslationWorld([cellIndex * 3, 0, rowIndex * 3]);
                }

                if (cell.ceiling) {
                    const ceilingCode = Array.isArray(cell.ceiling) ? cell.ceiling[~~(Math.random() * cell.ceiling.length)] : cell.ceiling;
                    const ceilingToPlace = wlUtils.cloneObject(this.ceilings[ceilingCode]);
                    ceilingToPlace.resetTranslationRotation();
                    ceilingToPlace.setTranslationWorld([cellIndex * 3, 0, rowIndex * 3]);
                }
            });
        });
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


    update(dt) {

    }
}


/**
 * @typedef {Object} params
 * @property {WL.CustomParameter} width The width of the map to generate in roomparts of 3m (integer); defaults to 30
 * @property {WL.CustomParameter} height The width of the map to generate in roomparts of 3m (integer); default to 30
 */
/** @type params */
const params = {
    width: { type: WL.Type.Int, default: 30 },
    height: { type: WL.Type.Int, default: 30 },
}

WL.registerComponent('mapgenerator', params, mapgenComponent);
