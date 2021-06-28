
WL.registerComponent('zombie-controller', {
    zombieMesh: {type: WL.Type.Object},
    zombieAnimation: {type: WL.Type.Object},
    walkAnimParam:{type:WL.Type.Animation},
    dieAnimParam:{type:WL.Type.Animation},
    speed: {type: WL.Type.Float, default: 500.0}
}, {
   
    start: function() {
        const mesh = this.zombieMesh.getComponent('mesh');
        const anim = this.zombieAnimation.getComponent('animation');
        anim.animation = this.walkAnimParam.retarget(mesh.skin);
        anim.play();
    },
   update:function(dt){
        var temp = [];
        this.zombieMesh.getForward(temp);
        glMatrix.vec3.scale(temp, temp, - this.speed/1000 * dt );
        this.zombieMesh.translate(temp);
   }
});