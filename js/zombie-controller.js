
WL.registerComponent('zombie-controller', {
    zombieMesh: { type: WL.Type.Object },
    zombieAnimation: { type: WL.Type.Object },
    zombiePool: { type: WL.Type.Object },
    walkAnimParam: { type: WL.Type.Animation },
    biteAnimParam: { type: WL.Type.Animation },
    speed: { type: WL.Type.Float, default: 500.0 },
    player: { type: WL.Type.Object }
}, {
    start: function () {
        this.mesh = this.zombieMesh.getComponent('mesh');
        this.anim = this.zombieAnimation.getComponent('animation');
        this.anim.animation = this.walkAnimParam.retarget(this.mesh.skin);        
        this.wm = this.object.getComponent('waypoint-movement');        
        this.reset();
        
    },
    reset:function(){
        this.zombiePool.getComponent("zombie-pool").put(this);
        this.anim.stop();
        this.active = false;
        this.biting = false;       
        this.wm.active = false;
    },
    spawn:function(){        
        this.anim.animation = this.walkAnimParam.retarget(this.mesh.skin);
        this.anim.play();
        this.biting = false;
        this.wm.reset();
        this.wm.active = true;        
        this.active = true;
    },
    update: function (dt) {
        if(!this.active){
            return;
        }
        let zombiePos = [];
        this.object.getTranslationWorld(zombiePos);

        //this.zombieMesh.getForward(temp);
        let playerPos = []
        this.player.getTranslationWorld(playerPos);
        let newVec = [];
        if (glMatrix.vec3.dist(playerPos, zombiePos) < 2) {
            if (!this.biting) {
                this.anim.animation = this.biteAnimParam.retarget(this.mesh.skin);
                this.anim.play();
                this.biting = true;
            }
        } else {
            if(this.biting){
                this.anim.animation = this.walkAnimParam.retarget(this.mesh.skin);
                this.anim.play();
                this.biting = false;
            }
            // //move in the direction of the player            
            // glMatrix.vec3.subtract(newVec, playerPos, zombiePos);
            
            // glMatrix.vec3.normalize(newVec, newVec);
            
            // glMatrix.vec3.scale(newVec, newVec, this.speed / 1000 * dt);
            // // const fwd = this.object.getForward([]);
            // // const up = new Float32Array(3);
            // // glMatrix.vec3.transformQuat(up, [0, 1, 0], this.object.transformWorld);
            // this.object.lookAt(playerPos, [0, 1, 0]);           
            
            
            // this.object.translate(newVec);

        }

    }
});