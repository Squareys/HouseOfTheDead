WL.registerComponent('zombie-controller', {
    param: {type: WL.Type.Float, default: 1.0},
}, {
    init: function() {
        
    },
    start: function() {
        this.animation = this.object.getComponent('animation');        
        this.animation.play();
        this.pathRoot = WL.scene.addObject();
        this.A = WL.scene.addObject(this.pathRoot);
        this.A.name='A';
        this.B = WL.scene.addObject(this.pathRoot);
        this.B.name='B';
        this.B.setTranslationWorld([5,0,0]);
        this.C = WL.scene.addObject(this.pathRoot);
        this.C.name='C';
        this.C.setTranslationWorld([10,0,0]);
        this.waypointMovement = this.object.addComponent('waypoint-movement',{
            pathObject: this.pathRoot
        });
        this.waypointMovement.addOnFinalWaypointReachedCallback(()=>{            
            this.A.setTranslationWorld([10,0,0]);            
            this.B.setTranslationWorld([10,0,5]);            
            this.C.setTranslationWorld([10,0,10]);
            this.waypointMovement.reset();
            this.waypointMovement.setPathObject(this.pathRoot);
        });
            
    },
    update: function(dt) {
        
    },
});
