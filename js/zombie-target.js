WL.registerComponent('zombie-target', {
    zombieController: {type: WL.Type.Object},
    zombieParticles: {type: WL.Type.Object}
}, {
    kill:function(){
        let thispos = [];
        this.object.getTranslationWorld(thispos);
        // this.zombieParticles.setTranslationWorld(thispos);
        // this.zombieParticles.getComponent('zombie-particles').die();
        this.zombieController.getComponent('zombie-controller').die();
    }
});