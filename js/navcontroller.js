/*
The navcontroller tracks if a specific tile in the game can be used for navigation
Per room element 9 pixel are drawn to the map. 1 color indicates that the tile can navigated to; another color 
indicates that the tile cannot be navigated to. 

This make might also be used for the zombies to navigate.

Challenge: 
- How do we tell each room type what tiles can be used for navigation?
    - it's always 3x3.
    - maybe every room needs to have an 'ID' of some sort.

*/

WL.registerComponent('navcontroller', {
    param: { type: WL.Type.Float, default: 1.0 },
}, {
    init: function () {
        var mapCanvas = document.createElement('canvas');
        mapCanvas.style.position = 'absolute';
        mapCanvas.style.top = '0px';
        mapCanvas.style.left = '0px';
        mapCanvas.style.zIndex = '100';
        mapCanvas.width = 128;
        mapCanvas.height = 128;

        mapCanvas.style.width = '256px';
        mapCanvas.style.height = '256px';
        mapCanvas.style.imageRendering = 'pixelated';
        document.body.appendChild(mapCanvas);

        this.mapContext = mapCanvas.getContext('2d');
        this.mapContext.fillStyle = "rgba(0, 0, 0, 1)";
        this.mapContext.fillRect(0, 0, 128, 128);
    },
    draw: function (x, y, roomId, isArch, orientation) {
        this.mapContext.fillStyle = `rgba(1, 120,${roomId} , 1)`;
        this.mapContext.fillRect(x * 3 + 64, y * 3 + 64, 3, 3);
        if (isArch) {
            this.mapContext.fillStyle = `rgba(${isArch ? 200 : 25}, 120,${roomId} , 1)`;
            switch (orientation) {
                case 'N':
                    this.mapContext.fillRect(x * 3 + 64 + 1, y * 3 + 64, 1, 1);
                    break;
                case 'S':
                    this.mapContext.fillRect(x * 3 + 64 + 1, y * 3 + 64 + 2, 1, 1);
                    break;
                case 'W':
                    this.mapContext.fillRect(x * 3 + 64, y * 3 + 64 + 1, 1, 1);
                    break;
                case 'E':
                    this.mapContext.fillRect(x * 3 + 64 + 2, y * 3 + 64 + 1, 1, 1);
                    break;
            }
        }
    },
    canTeleportTo: function (x, y, currentRoomId) {

        const dx = Math.floor(x)+65;
        const dy = Math.floor(y)+65;
        console.log(Math.round((x + .5) * 100) / 100, Math.round((y + .5) * 100) / 100, dx, dy);
        var data = this.mapContext.getImageData(dx, dy, 1, 1).data;
        // this.mapContext.fillStyle = `rgba(255, 255, 0 , 1)`;
        // this.mapContext.fillRect(x + 64, y + 64, 1, 1);        
        // round 2 decimals

        return data[2] !== 0;
    }
});