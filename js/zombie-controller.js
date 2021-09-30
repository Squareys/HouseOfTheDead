WL.registerComponent('zombie-controller', {
    mapGenObject: { type: WL.Type.Object }
}, {
    init: function () {

    },
    start: function () {
        let mapgen = this.mapGenObject.getComponent('mapgenerator');

        let startRoom = mapgen.roomList[~~(Math.random() * mapgen.roomList.length)];
        let p1 = ~~(Math.random() * startRoom.length);
        let roomPiece = startRoom[p1][~~(Math.random() * startRoom[p1].length)];
        let startPosition = roomPiece.position;

        this.animation = this.object.getComponent('animation');
        this.animation.play();
       // this.object.setTranslationWorld([startPosition.x, 0, startPosition.y]);
        this.pathRoot = WL.scene.addObject();
        this.A = WL.scene.addObject(this.pathRoot);
        this.A.name = 'A';
        this.A.setTranslationWorld([startPosition.x, 0, startPosition.y]);
        this.B = WL.scene.addObject(this.pathRoot);
        this.B.name = 'B';
        this.B.setTranslationWorld([startPosition.x+5 , 0, startPosition.y]);
        this.C = WL.scene.addObject(this.pathRoot);
        this.C.name = 'C';
        this.C.setTranslationWorld([startPosition.x+10, 0, startPosition.y]);
        this.waypointMovement = this.object.addComponent('waypoint-movement', {
            pathObject: this.pathRoot
        });
        
        // this.waypointMovement.addOnFinalWaypointReachedCallback(() => {
        //     this.A.setTranslationWorld([10, 0, 0]);
        //     this.B.setTranslationWorld([10, 0, 5]);
        //     this.C.setTranslationWorld([10, 0, 10]);
        //     this.waypointMovement.reset();
        //     this.waypointMovement.setPathObject(this.pathRoot);
        // });

    },
    update: function (dt) {

    },
});
