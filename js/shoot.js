WL.registerComponent('shoot', {

}, {
    init: function () {

    },

    start: function () {        
        this.input = this.object.getComponent('input');
        this.initialized = false;
        WL.onXRSessionStart.push((session) => {
            if (this.initialized) return;
            session.addEventListener('select', (e) => {
                if (e.inputSource.handedness === this.input.handedness) {
                    let origin = this.object.getTranslationWorld([])
                    let forwardDirection = [0, 0, 0];
                    this.object.getForward(forwardDirection)
                    let rayHit = WL.scene.rayCast(origin,
                        forwardDirection, (1 << 2));

                    if (rayHit.hitCount > 0) {
                        for (let i = 0; i < rayHit.hitCount; i++) {
                            const target = rayHit.objects[i].getComponent('zombie-target');
                            if (target) {                                
                                target.kill();
                            }
                        }
                    }
                }
            })
            this.initialized = true;
        })
    },
    update: function (dt) {

    },
});
