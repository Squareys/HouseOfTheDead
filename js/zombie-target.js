WL.registerComponent('zombie-target', {
    zombieController: { type: WL.Type.Object },
    zombieParticles: { type: WL.Type.Object }
}, {
    init: function () {
        this.soundHit = this.object.addComponent('howler-audio-source', { src: 'sfx/headshot.wav', spatial: true });
    },
    kill: function () {
        let thispos = [];
        this.object.getTranslationWorld(thispos);
        // this.zombieParticles.setTranslationWorld(thispos);
        // this.zombieParticles.getComponent('zombie-particles').die();

        this.soundHit.play();
        this.zombieController.getComponent('zombie-controller').die();
    }
});