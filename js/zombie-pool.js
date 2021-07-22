WL.registerComponent('zombie-pool', {
}, {
    init: function () {
        this.pool = [];
    },
    put: function (zombie) {
        zombie.isInPool = true;
        zombie.object.setTranslationWorld([0,-1000,0]); 
        this.pool.push(zombie);        
    },
    get:function(){
        var zombie = this.pool.pop();
        if(zombie){
            zombie.object.setTranslationWorld([0,0,0]); 
            zombie.isInPool = false;
        }
        return zombie;
    }
});