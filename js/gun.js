WL.registerComponent('gun', {

}, {
    init: function () {

    },
    start: function () {
        this.soundGun = this.object.addComponent('howler-audio-source', { src: 'licensed/gun.wav', spatial: true });

        this.input = this.object.getComponent('input');
        this.initialized = false;
        WL.onXRSessionStart.push((session) => {
            if (this.initialized) return;
            session.addEventListener('select', (e) => {
                if (e.inputSource.handedness === this.input.handedness) {
                    this.pulse(e.inputSource.gamepad);
                    this.soundGun.play();
                }
            })
            this.initialized = true;
        })

    },
    pulse: function (gamepad) {
        var actuator;
        if (!gamepad || !gamepad.hapticActuators) { return; }        
        actuator = gamepad.hapticActuators[0];
        if(!actuator) return;
        actuator.pulse(1, 100);        
      },
    update: function (dt) {

    },
});