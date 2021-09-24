import { vec3, quat } from 'gl-matrix';

/**
  * @description clones the passed object
  * @param {Object} object - the object to clone
  * @returns {Object} the cloned object
  */
function cloneObject(object) {
    if(!object || !object.parent){
        console.log(object);
        debugger;
    }
    let cloned = WL.scene.addObject(object.parent);
    let components = object.getComponents();
    for (let i = 0; i < components.length; i++) {
        if (components[i].type == "mesh") {
            cloned.addComponent('mesh', {
                mesh: components[i].mesh,
                material: components[i].material
            });
            // newMesh.mesh = components[i].mesh;
            // newMesh.material = components[i].material;
            // } else if (components[i].type == "light") {
            //     cloned.addComponent('light',{
            //         color: components[i].color,
            //         lightType: components[i].lightType,
            //     });
        } else {
            console.log(components[i].type)
            cloned.addComponent(components[i].type, components[i]);
        }
    }
    let pos = [];
    object.getTranslationLocal(pos);
    cloned.translate(pos);
    cloned.rotationLocal = object.rotationLocal;
    cloned.scalingLocal = object.scalingLocal;

    if (object.children.length > 0) {
        for (let i = 0; i < object.children.length; i++) {
            let childClone = this.cloneObject(object.children[i],);
            childClone.parent = cloned;
        }
    }
    cloned.setDirty();
    return cloned;
}

/**
* Finds a child object by name
* @param {WL.Object} object Object to get the child from 
* @param {string} childName The name of the child to find
* @returns {WL.Object} The child object; or undefined if not found
*/
function findChild(object, childName) {
    return object.children.filter(o => o.name == childName)[0];
}
/**
    * Converts direction int to a rotation
    * @param {'N'|'S'|'E'|'W'} direction
    * @returns {[4]} Quaternion with rotation
    */
function rotationFromDirection(direction) {
    return quat.fromEuler(quat.create(), 0, { 'N': 0, 'S': 180, 'E': 270, 'W': 90 }[direction], 0);
}

function translateFromDirection(x, y, direction) {
    return {
        x: { 'N': 0, 'S': 0, 'E': 1, 'W': -1 }[direction],
        y: { 'N': -1, 'S': 1, 'E': 0, 'W': 0 }[direction]
    }
}

export const wlUtils = {
    cloneObject,
    findChild,
    rotationFromDirection,
    translateFromDirection
}