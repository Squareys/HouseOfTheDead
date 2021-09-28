import { vec3, quat2 } from 'gl-matrix';

WL.registerComponent('target-picker', {
    allowedPickerMeshObject: { type: WL.Type.Object, default: null },
    notAllowedPickerMeshObject: { type: WL.Type.Object, default: null },
    floorGroup: { type: WL.Type.Int, default: 1 },
    player: { type: WL.Type.Object },
    navControllerObject: { type: WL.Type.Object },

}, {
    canTrigger:function(){
        return true;
    },
    pickingAllowed:function(obj, x,y,z){
        return this.navController.canTeleportTo(x,z);
    },
    picked:function(obj, x,y,z){
        console.log('please override picked function');
    },
    start:function(){
        this.pickingActive = false;
        this.input = this.object.getComponent('input');     
        this.navController = this.navControllerObject.getComponent('navcontroller');

        // throw error or warning when no input is on the mesh.
        this.allowedPickerMeshObject.translate([1000, -1000, 1000]);
        this.notAllowedPickerMeshObject.translate([1000, -1000, 1000]);
        this.initialized = true;
        
    }, 
    update: function(dt) {
        if (!this.initialized ||!this.input.xrInputSource) {
            return;
        }
        if (this.input.xrInputSource.gamepad.buttons[0].pressed && this.pickingActive === false && this.canTrigger()) {
          
            this.pickingActive = true;
        }
        if (!this.input.xrInputSource.gamepad.buttons[0].pressed && this.pickingActive === true) {
            this.pickingActive = false;            
            if (this.hitSpot) {
                let x = Math.floor(this.hitSpot[0]+.5);
                let y = Math.floor(this.hitSpot[2]+.5);
                if (this.pickingAllowed(this.hitObject, x, 0, y)) {                
                    let position = [];
                    this.player.getTranslationWorld(position);   
                    this.player.setTranslationWorld(
                        [x, position[1], y]);
                }

                if (!this.indicatorHidden) {
                    this.allowedPickerMeshObject.translate([1000, -1000, 1000]);
                    this.notAllowedPickerMeshObject.translate([1000, -1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
            }
        }

        if (this.pickingActive) {
            let origin = [0, 0, 0];
            quat2.getTranslation(origin, this.object.transformWorld);
            
            let quat = this.object.transformWorld;

            let forwardDirection = [0, 0, 0];
            vec3.transformQuat(forwardDirection, [0, 0, -1], quat);
            let rayHit = WL.scene.rayCast(origin, 
                forwardDirection, (1 << 1) + (1<<2) ) ; 
            
            if (rayHit.hitCount > 0) {                
                if (this.indicatorHidden) {
                    this.indicatorHidden = false;
                }
                this.hitSpot = rayHit.locations[0];                
                this.hitObject = rayHit.objects[0];                                   
                let x = Math.floor(this.hitSpot[0]+.5);
                let y = Math.floor(this.hitSpot[2]+.5);
                if (this.pickingAllowed(this.hitObject, x, 0, y)) {
                    this.notAllowedPickerMeshObject.setTranslationWorld([1000, 1000, 1000]);
                    this.allowedPickerMeshObject.resetTranslationRotation();
                    this.allowedPickerMeshObject.translate(
                        [x, 
                        Math.floor(rayHit.locations[0][1]) + .1,  
                        y]);
                }else{
                    this.allowedPickerMeshObject.setTranslationWorld([1000, 1000, 1000]);
                    this.notAllowedPickerMeshObject.resetTranslationRotation();
                    this.notAllowedPickerMeshObject.translate(
                        [x,  
                        Math.floor(rayHit.locations[0][1]) + .1,  
                        y]);
                }
            } else {
                if (!this.indicatorHidden) {
                    this.allowedPickerMeshObject.translate([1000, 1000, 1000]);
                    this.notAllowedPickerMeshObject.translate([1000, 1000, 1000]);
                    this.indicatorHidden = true;
                }
                this.hitSpot = undefined;
                this.hitObject = undefined;  
            }
        }
    },
});