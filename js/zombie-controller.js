
WL.registerComponent('zombie-controller', {
    zombieMesh: { type: WL.Type.Object },
    zombieAnimation: { type: WL.Type.Object },
    walkAnimParam: { type: WL.Type.Animation },
    biteAnimParam: { type: WL.Type.Animation },
    speed: { type: WL.Type.Float, default: 500.0 },
    player: { type: WL.Type.Object }
}, {
    start: function () {
        this.mesh = this.zombieMesh.getComponent('mesh');
        this.anim = this.zombieAnimation.getComponent('animation');
        this.anim.animation = this.walkAnimParam.retarget(this.mesh.skin);
        this.anim.play();
        this.biting = false;
    },
    update: function (dt) {
        let zombiePos = [];
        this.zombieMesh.getTranslationWorld(zombiePos);

        //this.zombieMesh.getForward(temp);
        let playerPos = []
        this.player.getTranslationWorld(playerPos);
        let newVec = [];
        if (glMatrix.vec3.dist(playerPos, zombiePos) < 1) {
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
            glMatrix.vec3.sub(newVec, playerPos, zombiePos);
            glMatrix.vec3.normalize(newVec, newVec);

            glMatrix.vec3.scale(newVec, newVec, this.speed / 1000 * dt);

            //TODO: Fix Rotating towards player
            //this.zombieMesh.lookAt(playerPos, [0,1,0]);
            this.zombieMesh.translate(newVec);

        }

    }
});