WL.registerComponent('snap-rotate', {
    player: { type: WL.Type.Object },
    degrees: { type: WL.Type.Int, default: 30 }
}, {

    start: function () {
        this.input = this.object.getComponent('input');
        this.snapped = false;

    },
    update: function (dt) {
        if (!this.input.xrInputSource) {
            return;
        }

        const currentAxis = this.input.xrInputSource.gamepad.axes[2];
        if (currentAxis > -.2 && currentAxis < .2) {
            this.snapped = false;
            return;
        }
        if (Math.abs(currentAxis) < .8) {
            return;
        }
        let lastHeadPos = [0, 0, 0];
        this.player.getTranslationWorld(lastHeadPos);

        if (currentAxis < -.8 && !this.snapped) {

            this.player.rotateAxisAngleDeg([0, 1, 0], this.degrees);
            this.snapped = true;
        }

        if (currentAxis > .8 && !this.snapped) {

            this.player.rotateAxisAngleDeg([0, 1, 0], -this.degrees);
            this.snapped = true;
        }

        let currentHeadPos = [0, 0, 0];
        this.player.getTranslationWorld(currentHeadPos);
        let newPos = [0, 0, 0];
        glMatrix.vec3.sub(newPos, lastHeadPos, currentHeadPos);
        this.player.translate(newPos);
    },
});