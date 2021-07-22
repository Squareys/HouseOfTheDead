WL.registerComponent('spawner', {
    zombiePoolObject: { type: WL.Type.Object }
}, {
    start: function () {
        this.zombiePool = this.zombiePoolObject.getComponent("zombie-pool");
        setInterval(this.spawnZombie.bind(this), 5000);
        
    },
    spawnZombie: function () {

        let zombie = this.zombiePool.get();
        if (zombie) {
            zombie.spawn(this.object.children[0]);
        }
    },
    update: function (dt) {

    },
});