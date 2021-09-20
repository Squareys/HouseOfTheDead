export type CustomParameter = {
    /**
     * Parameter type
     */
    type: Type;
    /**
     * Default value, depending on type.
     */
    default?: any;
    /**
     * Values for {@link Type.Enum }
     */
    values: string[];
};
export type xrSessionStartCallback = (session: any) => any;
export type xrSessionEndCallback = () => any;
export type xrSupportCallback = (type: string, supported: boolean) => any;
export type sceneLoadedCallback = () => any;
/**
 * Component parameter type enum
 */
export type Type = number;
export namespace Type {
    const Bool: number;
    const Int: number;
    const Float: number;
    const String: number;
    const Enum: number;
    const Object: number;
    const Mesh: number;
    const Texture: number;
    const Material: number;
    const Animation: number;
    const Skin: number;
}
/**
 * Collider type enum for {@link CollisionComponent }
 */
export type Collider = number;
export namespace Collider {
    const Sphere: number;
    const AxisAlignedBox: number;
    const Box: number;
}
/**
 * Alignment type enum for {@link TextComponent }
 */
export type Alignment = number;
export namespace Alignment {
    const Left: number;
    const Center: number;
    const Right: number;
}
/**
 * Justification type enum for {@link TextComponent }
 */
export type Justification = number;
export namespace Justification {
    const Line: number;
    const Middle: number;
    const Top: number;
}
/**
 * Input type enum for {@link InputComponent }
 */
export type InputType = number;
export namespace InputType {
    const Head: number;
    const EyeLeft: number;
    const EyeRight: number;
    const ControllerLeft: number;
    const ControllerRight: number;
    const RayLeft: number;
    const RayRight: number;
}
/**
 * Light type enum for {@link LightComponent }
 */
export type LightType = number;
export namespace LightType {
    const Point: number;
    const Sun: number;
}
/**
 * Animation state of {@link AnimationComponent }
 */
export type AnimationState = number;
export namespace AnimationState {
    const Playing: number;
    const Paused: number;
    const Stopped: number;
}
/**
 * *
 * [PhysX API Reference](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxapi/files/structPxForceMode.html)
 */
export type ForceMode = number;
export namespace ForceMode {
    const Force: number;
    const Impulse: number;
    const VelocityChange: number;
    const Acceleration: number;
}
/**
 * Collision callback event type
 */
export type CollisionEventType = number;
export namespace CollisionEventType {
    const Touch: number;
    const TouchLost: number;
}
/**
 * *
 * [PhysX SDK Guide](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/Geometry.html#geometry-types)
 */
export type Shape = number;
export namespace Shape {
    export const None: number;
    const Sphere_1: number;
    export { Sphere_1 as Sphere };
    export const Capsule: number;
    const Box_1: number;
    export { Box_1 as Box };
    export const Plane: number;
    export const ConvexMesh: number;
    export const TriangleMesh: number;
}
/**
 * Wonderland Engine API
 * @namespace WL
 */
/**
 * @typedef CustomParameter
 * @type {object}
 * @property {Type} type Parameter type
 * @property {*} [default] Default value, depending on type.
 * @property {string[]} values Values for {@link Type.Enum}
 */
/**
 * Register a custom JavaScript component type
 *
 * @param {string} name Name of the component
 * @param {object} params Dict of param names to {@link CustomParameter}
 * @param {Component} object Object containing functions for the component type
 *
 * @example
 * registerComponent('my-new-type', {
 *  myParam: {type: Type.Float, default: 42.0},
 * }, {
 *  init: function() {},
 *  start: function() {},
 *  update: function(dt) {},
 *  onActivate: function() {},
 *  onDeactivate: function() {},
 * });
 */
export function registerComponent(name: string, params: object, object: Component): void;
/**
 * Canvas element that Wonderland Engine renders to
 * @type {HTMLCanvasElement}
 */
export let canvas: HTMLCanvasElement;
/**
 * Current main scene
 * @type{Scene}
 */
export let scene: Scene;
/**
 * Current WebXR session or {@link null} if no session active
 * @type {XRSession}
 */
export let xrSession: any;
/**
 * @callback xrSessionStartCallback
 * @param {XRSession} session WebXR session that started
 */
/**
 * @callback xrSessionEndCallback
 */
/**
 * List of functions to call if a WebXR session is started
 * @type {xrSessionStartCallback}
 */
export const onXRSessionStart: xrSessionStartCallback;
/**
 * List of functions to call if a WebXR session ends
 * @type {xrSessionEndCallback}
 */
export const onXRSessionEnd: xrSessionEndCallback;
/**
 * @callback xrSupportCallback
 * @param {string} type Type of session which is supported/not supported. Either `"vr"` or `"ar"`
 * @param {boolean} supported Whether given session type is supported
 */
/**
 * List of functions to call once VR/AR support has been determined.
 * @type {xrSupportCallback}
 *
 * Will be called once for AR and once for VR independent of support for each.
 * This allows you to notify the user of both cases: support and missing support of XR.
 * See the `supported` parameter of the callback, which indicates support.
 */
export let onXRSupported: xrSupportCallback;
/**
 * @callback sceneLoadedCallback
 */
/**
 * List of functions to call once the main scene has been loaded
 * @type {sceneLoadedCallback}
 */
export let onSceneLoaded: sceneLoadedCallback;
/**
 * Whether AR is supported by the browser
 *
 * `undefined` until support could be determined
 */
export let arSupported: any;
/**
 * Whether VR is supported by the browser
 *
 * `undefined` until support could be determined
 */
export let vrSupported: any;
/**
 * Physics, only available when physx is enabled in the runtime
 * @type{Physics}
 */
export let physics: Physics;
export let _images: any[];
export let _sceneLoadedCallback: any[];
export namespace textures {
    function load(filename: string, crossOrigin: string): Promise<Texture>;
}
/** Initialize API resources, called by the engine automatically. */
export function init(): void;
/** Initialize API resources, called by the engine automatically, if
 * PhysX is enabled. */
export function _initPhysics(): void;
export function updateTempMemory(): void;
/**
 * Provides global scene functionality like raycasting.
 */
export class Scene {
    _rayHit: any;
    _hit: RayHit;
    onPreRender: any[];
    onPostRender: any[];
    /**
     * @returns {ViewComponent[]} currently active view components
     */
    get activeViews(): ViewComponent[];
    /**
     * Cast a ray through the scene and find intersecting objects.
     *
     * The resulting ray hit will contain up to **4** closest ray hits,
     * sorted by increasing distance.
     *
     * @param {number[]} o Ray origin
     * @param {number[]} d Ray direction
     * @param {number} group Collision group to filter by: only objects that are
     *        part of given group are considered for raycast.
     *
     * @note The returned {@link RayHit} object is owned by the Scene instance and
     *       will be reused with the next {@link Scene#rayCast} call.
     */
    rayCast(o: number[], d: number[], group: number): RayHit;
    /**
     * Add object to the scene
     *
     * @param {$Object} parent Parent object or {@link null}
     * @returns {$Object} newly created object
     */
    addObject(parent: $Object): $Object;
    /**
     * Batch-add objects to the scene
     *
     * Will provide better performance for adding multiple objects (e.g. > 16)
     * than calling {@link Scene#addObject} repeatidly in a loop.
     *
     * By providing upfront information of how many objects will be required,
     * the engine is able to batch-allocate the required memory rather than
     * convervatively grow the memory in small steps.
     *
     * **Experimental:** This API might change in upcoming versions.
     *
     * @param {number} count Number of objects to add
     * @param {$Object} parent Parent object or {@link null}, default {@link null}
     * @param {number} componentCountHint Hint for how many components in total will
     *      be added to the created objects afterwards, default `0`.
     * @returns {$Object[]} newly created objects
     */
    addObjects(count: number, parent: $Object, componentCountHint: number): $Object[];
    /**
     * Set the background clear color
     *
     * @param {number[]} color new clear color (RGBA)
     * @since 0.8.5
     */
    set clearColor(arg: number[]);
    /**
     * Load a scene file (.bin)
     *
     * Will replace the currently active scene with the one loaded
     * from given file. It is assumed that JavaScript components required by
     * the new scene were registered in advance.
     *
     * @param filename Path to the .bin file
     */
    load(filename: any): void;
    /**
     * Load a external 3D file (.gltf, .glb)
     *
     * Loads and parses the gltf file and its images and appends the result
     * to scene.
     *
     * @param filename Path to the .gltf or .glb file
     * @returns {Promise<$Object>} Root of the loaded scene
     */
    append(filename: any): Promise<$Object>;
}
/**
 * Native component
 *
 * Provides access to a native component instance of a specified component type
 */
export class Component {
    constructor(managerIndex: any, id: any);
    _id: any;
    _manager: any;
    /**
     * @returns {string} the name of this component's type
     */
    get type(): string;
    /**
     * @returns {$Object} The object this component is attached to
     */
    get object(): $Object;
    /**
     * Set whether this component is active
     *
     * Activating/deactivating a component comes at a small cost of reordering
     * components in the respective component manager. This function therefore
     * is not a trivial assignment.
     *
     * Does nothing if the component is already activated/deactivated.
     *
     * @param {boolean} active New active state
     */
    set active(arg: boolean);
    /**
     * @returns {boolean} Whether this component is active
     */
    get active(): boolean;
    /**
     * Checks equality by comparing whether the wrapped native component ids
     * and component manager types are equal.
     *
     * @param {?Component} otherComponent Component to check equality with
     * @returns {boolean} Whether this component equals the given component
     */
    equals(otherComponent: Component | null): boolean;
}
/**
 * Native collision component
 *
 * Provides access to a native collision component instance
 */
export class CollisionComponent extends Component {
    /**
     * Set collision component collider
     *
     * @param {Collider} collider Collider of the collision component.
     */
    set collider(arg: number);
    /**
     * @returns {Collider} Collision component collider
     */
    get collider(): number;
    /**
     * Set collision component extents
     *
     * If {@link CollisionComponent#collider} returns {@link Collider.Sphere}, only the first
     * component of the passed vector is used.
     *
     * @param {number[]} extents Extents of the collision component, expects a
     *      3 component array.
     */
    set extents(arg: number[]);
    /**
     * If {@link CollisionComponent#collider} returns {@link Collider.Sphere}, only the first
     * component of the returned vector is used.
     *
     * @returns {number[]} Collision component extents
    */
    get extents(): number[];
    /**
     * Set collision component group
     *
     * @param {number} group Group mask of the collision component
     */
    set group(arg: number);
    /**
     * The groups is a bitmask that is compared to other components in {@link CollisionComponent#queryOverlaps}
     * or the group in {@link Scene#rayCast}.
     *
     * Colliders that have no common groups will not overlap with each other. If a collider
     * has none of the groups set for {@link Scene#rayCast}, the ray will not hit it.
     *
     * Each bit represents belonging to a group, see example.
     *
     * @example
     *    // c belongs to group 2
     *    c.group = (1 << 2);
     *
     *    // c belongs to group 0
     *    c.group = (1 << 0);
     *
     *    // c belongs to group 0 *and* 2
     *    c.group = (1 << 0) | (1 << 2);
     *
     *    (c.group & (1 << 2)) != 0; // true
     *    (c.group & (1 << 7)) != 0; // false
     *
     * @returns {number} collision component group
     */
    get group(): number;
    /**
     * Query overlapping objects
     *
     * @returns {CollisionComponent[]} Collision components overlapping this collider.
     */
    queryOverlaps(): CollisionComponent[];
}
/**
 * Native text component
 *
 * Provides access to a native text component instance
 */
export class TextComponent extends Component {
    /**
     * Set text component alignment
     *
     * @param {Alignment} alignment Alignment for the text component.
     */
    set alignment(arg: number);
    /**
     * @returns {Alignment} Text component alignment
     */
    get alignment(): number;
    /**
     * Set text component justification
     *
     * @param {Justification} justification Justification for the text component.
     */
    set justification(arg: number);
    /**
     * @returns {Justification} Text component justification
     */
    get justification(): number;
    /**
     * Set text component text
     *
     * @param {string} text Text of the text component
     */
    set text(arg: string);
    /**
     * @returns {string} Text component text
     */
    get text(): string;
    /**
     * Set material to render the text with
     *
     * @param {Material} material New material
     */
    set material(arg: Material);
    /**
     * @returns {?Material} Material used to render the text
     */
    get material(): Material;
}
/**
 * Native view component
 *
 * Provides access to a native view component instance
 */
export class ViewComponent extends Component {
    /**
     * @returns {Float32Array} Projection matrix
     */
    get projectionMatrix(): Float32Array;
}
/**
 * Native input component
 *
 * Provides access to a native input component instance
 */
export class InputComponent extends Component {
    /**
     * Set input component type
     *
     * @params {InputType} New input component type
     */
    set inputType(arg: number);
    /**
     * @returns {InputType} Input component type
     */
    get inputType(): number;
    /**
     * @returns {?XRInputSource} WebXR Device API input source associated
     *          with this input component, if type {@link InputType.ControllerLeft}
     *          or {@link InputType.ControllerRight}.
     */
    get xrInputSource(): any;
    /**
     * @returns {?string} 'left', 'right' or {@link null} depending on the {@link InputComponent#inputType}.
     */
    get handedness(): string;
}
/**
 * Native light component
 *
 * Provides access to a native light component instance
 */
export class LightComponent extends Component {
    /** @returns {Float32Array} View on the light color */
    get color(): Float32Array;
    /**
     * Set light type
     *
     * @param {LightType} lightType Type of the light component.
     */
    set lightType(arg: number);
    /** @returns {LightType} Light type */
    get lightType(): number;
}
/**
 * Native animation component
 *
 * Provides access to a native animation component instance
 */
export class AnimationComponent extends Component {
    /**
     * Set animation to play
     *
     * Make sure to {@link Animation#retarget} the animation to affect the
     * right objects.
     *
     * @param {Animation} animation to play
     */
    set animation(arg: Animation);
    /** @returns {Animation} animation set for this component */
    get animation(): Animation;
    /**
     * Set play count. Set to `0` to loop indefinitely.
     *
     * @param {number} playCount Number of times to repeat the animation
     */
    set playCount(arg: number);
    /** @returns {number} Number of times the animation is played */
    get playCount(): number;
    /** Play animation */
    play(): void;
    /** Stop animation */
    stop(): void;
    /** Pause animation */
    pause(): void;
    /** @returns {AnimationState} Current playing state of the animation */
    get state(): number;
}
/**
 * Native mesh component
 *
 * Provides access to a native mesh component instance
 */
export class MeshComponent extends Component {
    /**
     * Set material to render the mesh with
     *
     * @param {?Material} material Material to render the mesh with
     */
    set material(arg: Material);
    /** @returns {?Material} Material used to render the mesh */
    get material(): Material;
    /**
     * Set mesh to rendered with this component
     *
     * @param {?Mesh} mesh Mesh rendered by this component
     */
    set mesh(arg: Mesh);
    /** @returns {?Mesh} Mesh rendered by this component */
    get mesh(): Mesh;
    /**
     * Set skin to transform this mesh component
     *
     * @param {?Skin} skin Skin to use for rendering skinned meshes
     */
    set skin(arg: Skin);
    /** @returns {?Skin} Skin for this mesh component */
    get skin(): Skin;
}
/**
 * Native physx rigid body component
 *
 * Provides access to a native mesh component instance.
 * Only available when using physx enabled runtime, see "Project Settings > Runtime".
 */
export class PhysXComponent extends Component {
    /**
     * Set whether this rigid body is static
     *
     * Setting this property only takes effect once the component
     * switches from inactive to active.
     *
     * @param {boolean} b Whether the rigid body should be static
     */
    set static(arg: boolean);
    /**
     * Whether this rigid body is static
     *
     * This property returns whether the rigid body is *effectively*
     * static. If static property was set while the rigid body was
     * active, it will not take effect until the rigid body is set
     * inactive and active again. Until the component is set inactive,
     * this getter will return whether the rigidbody is actually
     * static.
     */
    get static(): boolean;
    /**
     * Set whether this rigid body is kinematic
     *
     * @param {boolean} b Whether the rigid body should be kinematic
     */
    set kinematic(arg: boolean);
    /**
     * Whether this rigid body is kinematic
     */
    get kinematic(): boolean;
    /**
     * Set the shape for collision detection
     *
     * @param {Shape} s New shape
     * @since 0.8.5
     */
    set shape(arg: number);
    /**
     * The shape for collision detection
     */
    get shape(): number;
    /**
     * Set the shape extents for collision detection
     *
     * @param {number[]} e New extents for the shape
     * @since 0.8.5
     */
    set extents(arg: number[]);
    /**
     * The shape extents for collision detection
     */
    get extents(): number[];
    /**
     * Set staticFriction
     * @param {number} v New staticFriction
     */
    set staticFriction(arg: number);
    /**
     * Get staticFriction
     */
    get staticFriction(): number;
    /**
     * Set dynamicFriction
     * @param {number} v New dynamicDamping
     */
    set dynamicFriction(arg: number);
    /**
     * Get dynamicFriction
     */
    get dynamicFriction(): number;
    /**
     * Set restitution
     * @param {number} v New restitution
     */
    set restitution(arg: number);
    /**
     * Get restitution
     */
    get restitution(): number;
    /**
     * Set linearDamping
     * @param {number} v New linearDamping
     */
    set linearDamping(arg: number);
    /**
     * Get linearDamping
     */
    get linearDamping(): number;
    /**
     * Set angularDamping
     * @param {number} v New angularDamping
     */
    set angularDamping(arg: number);
    /**
     * Get angularDamping
     */
    get angularDamping(): number;
    /**
     * Set linear velocity
     *
     * [PhysX Manual - "Velocity"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#velocity)
     *
     * @param {number[]} v New linear velocity
     */
    set linearVelocity(arg: Float32Array);
    /** @returns {Float32Array} Linear velocity */
    get linearVelocity(): Float32Array;
    /**
     * Set angular velocity
     *
     * [PhysX Manual - "Velocity"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#velocity)
     *
     * @param {number[]} v New angular velocity
     */
    set angularVelocity(arg: Float32Array);
    /** @returns {Float32Array} Linear velocity */
    get angularVelocity(): Float32Array;
    /**
     * Set mass
     *
     * [PhysX Manual - "Mass Properties"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#mass-properties)
     *
     * @param {number} m New mass
     */
    set mass(arg: number);
    /** @returns {number} mass */
    get mass(): number;
    /**
     * Set mass space interia tensor
     *
     * [PhysX Manual - "Mass Properties"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#mass-properties)
     *
     * @param {number[]} v New mass space interatia tensor
     */
    set massSpaceInteriaTensor(arg: number[]);
    /**
     * Apply a force
     *
     * [PhysX Manual - "Applying Forces and Torques"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#applying-forces-and-torques)
     *
     * @param {number[]} f Force vector
     * @param {number[]} m Force mode, see {@link ForceMode}, default `Force`.
     * @param {number[]} localForce Whether the force vector is in local space, default `false`.
     * @param {number[]} p Position to apply force at, default is center of mass.
     * @param {number[]} local Whether position is in local space, default `false`.
     */
    addForce(f: number[], m: number[], localForce: number[], p: number[], local: number[]): void;
    /**
     * Apply torque
     *
     * [PhysX Manual - "Applying Forces and Torques"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#applying-forces-and-torques)
     *
     * @param {number[]} f Force vector
     * @param {number[]} m Force mode, see {@link ForceMode}, default `Force`.
     */
    addTorque(f: number[], m: number[]): void;
    /**
     * @callback collisionCallback
     * @param {CollisionEventType} type Type of the event
     * @param {PhysXComponent} other Other component that was (un)collided with
     */
    /**
     * Add on collision callback
     *
     * @param {collisionCallback} callback Function to call when this rigid body
     *        (un)collides with any other.
     *
     * @example
     *  let rigidBody = this.object.getComponent('physx');
     *  rigidBody.onCollision(function(type, other) {
     *      // Ignore uncollides
     *      if(type == CollisionEventType.TouchLost) return;
     *
     *      // Take damage on collision with enemies
     *      if(other.object.name.startsWith('enemy-')) {
     *          this.applyDamage(10);
     *      }
     *  }.bind(this));
     */
    onCollision(callback: (type: CollisionEventType, other: PhysXComponent) => any): void;
    /**
     * Add filtered on collision callback
     *
     * @param {PhysXComponent} otherComp Component for which callbacks will
     *        be triggered. If you pass this component, the method is equivalent to
     *        {@link PhysXComponent#onCollision}.
     * @param {collisionCallback} callback Function to call when this rigid body
     *        (un)collides with `otherComp`.
     */
    onCollisionWith(otherComp: PhysXComponent, callback: (type: CollisionEventType, other: PhysXComponent) => any): void;
}
/**
 * Access to the physics scene
 */
export class Physics {
    _rayHit: any;
    _hit: RayHit;
    _callbacks: {};
    /**
     * Cast a ray through the physics scene and find intersecting objects.
     *
     * The resulting ray hit will contain **up to 4** closest ray hits,
     * sorted by increasing distance.
     *
     * @param {number[]} o Ray origin
     * @param {number[]} d Ray direction
     * @param {number} group Collision group to filter by: only objects that are
     *        part of given group are considered for raycast.
     * @param {number} maxDistance Maxium ray distance, default `100.0`.
     *
     * @note The returned {@link RayHit} object is owned by the Physics instance and
     *       will be reused with the next {@link Physics#rayCast} call.
     */
    rayCast(o: number[], d: number[], group: number, maxDistance: number): RayHit;
    _callCollisionCallback(a: any, index: any, type: any, b: any): void;
}
/**
 * Wrapper around a native mesh data
 */
export class Mesh {
    /** Size of a vertex in float elements */
    static get VERTEX_FLOAT_SIZE(): number;
    /** Size of a vertex in bytes */
    static get VERTEX_SIZE(): number;
    /** Position attribute offsets in float elements */
    static get POS(): {
        X: number;
        Y: number;
        Z: number;
    };
    /** Texture coordinate attribute offsets in float elements */
    static get TEXCOORD(): {
        U: number;
        V: number;
    };
    /** Normal attribute offsets in float elements */
    static get NORMAL(): {
        X: number;
        Y: number;
        Z: number;
    };
    /**
     * Constructor
     *
     * @param params Either index to wrap or set of parameters to create a new mesh
     * @param {number[]} params.indexData Index data values
     * @param {MeshIndexType} params.indexType Index type
     * @param {number[]} params.vertexData Interleaved vertex data values. A vertex is a set of 8 float values:
     *          - 0-3 Position
     *          - 4-7 Normal
     *          - 7-8 Texture Coordinate
     */
    constructor(params: any);
    _index: any;
    /** @returns {Float32Array} Vertex data */
    get vertexData(): Float32Array;
    /** @returns {Uint8Array|Uint16Array|Uint32Array} Vertex data */
    get indexData(): Uint8Array | Uint16Array | Uint32Array;
}
/**
 * Mesh index type
 */
export type MeshIndexType = number;
export namespace MeshIndexType {
    const UnsignedByte: number;
    const UnsignedShort: number;
    const UnsignedInt: number;
}
/**
 * Wrapper around a native material
 */
export class Material {
    /**
     * Wrap a native material index
     * @param {number} index
     * @returns {Material} Material instance or {@link null} if index <= 0.
     */
    static wrap(index: number): Material;
    /**
     * Create a new Material. Used internally by {@link Material.wrap}.
     *
     * @note Do not use this constructor directly, rather use
     *     {@link Material#clone} or {@link Material.wrap} to create instances.
     */
    constructor(index: any);
    _index: any;
    /**
     * @returns {string} Name of the shader used by this material
     */
    get shader(): string;
    /**
     * Create a copy of the underlying native material and {@link Material.wrap} the result
     * @returns {Material} Material clone
     */
    clone(): Material;
    _paramIndex(name: any): any;
    _paramType(paramIndex: any): {
        type: number;
        componentCount: number;
        metaType: number;
    };
}
/**
 * Wrapper around a native texture data
 */
export class Texture {
    /**
     * @param {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement|number} param HTML media element to create texture from or texture id to wrap.
     */
    constructor(param: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | number);
    _imageIndex: number;
    _id: any;
    /** @returns {boolean} Whether this texture is valid */
    get valid(): boolean;
    /** Update the texture to match the HTML element (e.g. reflect the current frame of a video) */
    update(): void;
}
/**
 * Wrapper around a native animation
 */
export class Animation {
    constructor(index: any);
    _index: any;
    /** @returns {number} Duration of this animation */
    get duration(): number;
    /** @returns {number} Number of tracks in this animation */
    get trackCount(): number;
    /**
     * Clone this animation retargeted to a new set of objects.
     *
     * The clone shares most of the data with the original and is therefore
     * light-weight.
     *
     * **Experimental:** This API might change in upcoming versions.
     *
     * If retargetting to {@link Skin}, the join names will be used to determine a mapping
     * from the previous skin to the new skin. The source skin will be retrieved from
     * the first track in the animation that targets a joint.
     *
     * @param {$Object[]|Skin} newTargets New targets per track. Expected to have
     *      {@link Animation#trackCount} elements or to be a {@link Skin}.
     * @returns {Animation} The retargeted clone of this animation.
     */
    retarget(newTargets: $Object[] | Skin): Animation;
}
/**
 * Wrapper around a native skin data
 */
export class Skin {
    constructor(index: any);
    _index: any;
    /** @returns {number} amount of joints in this skin */
    get jointCount(): number;
    /** @returns {Uint16Array} joints object ids for this skin */
    get jointIds(): Uint16Array;
    /**
     * Dual quaternions in a flat array of size 8 times {@link Skin#jointCount}
     *
     * @returns {Float32Array} Inverse bind transforms of the skin
     */
    get inverseBindTransforms(): Float32Array;
    /**
     * Vectors in a flat array of size 3 times {@link Skin#jointCount}
     *
     * @returns {Float32Array} Inverse bind scalings of the skin
     */
    get inverseBindScalings(): Float32Array;
}
/**
 * Scene graph object
 *
 * Node in the scene graph or "entity". Consists of transformation and a reference
 * to its parent object. Usually holds components and is accessible by components
 * through {@link Component#object}.
 *
 * Objects are stored in a data oriented mannor inside WebAssembly memory. This class
 * is a JavaScript API wrapper around this memory for more conventient use in
 * components.
 *
 * Objects can be created and added to a scene through
 * {@link Scene#addObject} on the {@link scene|main scene}.
 */
declare class $Object {
    static _typeIndexFor(type: any): any;
    static _typeNameFor(typeIndex: any): any;
    static _wrapComponent(type: any, componentType: any, componentId: any): any;
    static _wrapObject(objectId: any): any;
    /**
     * @param {number} o Object id to wrap
     */
    constructor(o: number);
    objectId: number;
    /**
     * Set the object's name
     * @param {string} newName String to the the object's name to
     */
    set name(arg: string);
    /**
     * Useful for identifying objects during debugging.
     * @returns {string} Name of the object
     */
    get name(): string;
    /**
     * Reparent object to given object.
     * @param {$Object} newParent New parent or {@link null} to parent to root
     * @note Reparenting is not trivial and might have a noticable performance impact
     */
    set parent(arg: $Object);
    /**
     * @returns {$Object} Parent of this object or {@link null} if parented to root
     */
    get parent(): $Object;
    /**
     * @returns {$Object[]} Children of this object
     *
     * @warning This method will currently return at most 512 child objects.
     */
    get children(): $Object[];
    /** Reset local transformation (translation, rotation and scaling) to identity */
    resetTransform(): void;
    /** Reset local translation and rotation to identity */
    resetTranslationRotation(): void;
    /**
     * Reset local rotation, keep translation.
     * @note To reset both rotation and translation, prefer
     *       {@link $Object#resetTranslationRotation}.
     */
    resetRotation(): void;
    /**
     * Reset local translation, keep rotation.
     * @note To reset both rotation and translation, prefer
     *       {@link $Object#resetTranslationRotation}.
     */
    resetTranslation(): void;
    /** Reset local scaling to identity (``[1.0, 1.0, 1.0]``)*/
    resetScaling(): void;
    /**
     * Translate object by a vector in the parent's space
     * @param {number[]} v Vector to translate by
     */
    translate(v: number[]): void;
    /**
     * Translate object by a vector in object space
     * @param {number[]} v Vector to translate by
     */
    translateObject(v: number[]): void;
    /**
     * Translate object by a vector in world space
     * @param {number[]} v Vector to translate by
     */
    translateWorld(v: number[]): void;
    /**
     * Rotate around given axis by given angle (degrees) in local space
     * @param {number[]} a Vector representing the rotation axis
     * @param {number} d Angle in degrees
     *
     * @note If the object is translated the rotation will be around
     *     the parent. To rotate around the object origin, use
     *     {@link $Object#rotateAxisAngleDegObject}
     *
     * @see {@link $Object#rotateAxisAngleRad}
     */
    rotateAxisAngleDeg(a: number[], d: number): void;
    /**
     * Rotate around given axis by given angle (radians) in local space
     * @param {number[]} a Vector representing the rotation axis
     * @param {number} d Angle in degrees
     *
     * @note If the object is translated the rotation will be around
     *     the parent. To rotate around the object origin, use
     *     {@link $Object#rotateAxisAngleDegObject}
     *
     * @see {@link $Object#rotateAxisAngleDeg}
     */
    rotateAxisAngleRad(a: number[], d: number): void;
    /**
     * Rotate around given axis by given angle (degrees) in object space
     * @param {number[]} a Vector representing the rotation axis
     * @param {number} d Angle in degrees
     *
     * Equivalent to prepending a rotation quaternion to the object's
     * local transformation.
     *
     * @see {@link $Object#rotateAxisAngleRadObject}
     */
    rotateAxisAngleDegObject(a: number[], d: number): void;
    /**
     * Rotate around given axis by given angle (radians) in object space
     * Equivalent to prepending a rotation quaternion to the object's
     * local transformation.
     *
     * @param {number[]} a Vector representing the rotation axis
     * @param {number} d Angle in degrees
     *
     * @see {@link $Object#rotateAxisAngleDegObject}
     */
    rotateAxisAngleRadObject(a: number[], d: number): void;
    /**
     * Rotate by a quaternion
     * @param {number[]} q the Quaternion to rotate by
     */
    rotate(q: number[]): void;
    /**
     * Rotate by a quaternion in object space
     *
     * Equivalent to prepending a rotation quaternion to the object's
     * local transformation.
     *
     * @param {number[]} q the Quaternion to rotate by
     */
    rotateObject(q: number[]): void;
    /**
     * Scale object by a vector in object space
     *
     * @param {number[]} v Vector to scale by
     */
    scale(v: number[]): void;
    /**
     * Set world transform.
     *
     * @param {number} t Local space transformation
     *
     * @since 0.8.5
     */
    set transformLocal(arg: Float32Array);
    /** @returns {Float32Array} Local / object space transformation */
    get transformLocal(): Float32Array;
    /**
     * Compute local / object space translation from transformation
     * @param {number[]} out Destination array/vector, expected to have at
     *                       least 3 elements.
     * @return {number[]} out
     */
    getTranslationLocal(out: number[]): number[];
    /**
     * Compute local / object space translation from transformation
     *
     * May recompute transformations of the hierarchy of this object,
     * if they were been by JavaScript components this frame.
     *
     * @param {number[]} out Destination array/vector, expected to have at
     *                       least 3 elements.
     * @return {number[]} out
     */
    getTranslationWorld(out: number[]): number[];
    /**
     * Set local / object space translation
     *
     * Concatenates a new translation dual quaternion onto the existing rotation.
     *
     * @param {number[]} v New local translation array/vector, expected to
     *                       have at least 3 elements.
     *
     */
    setTranslationLocal(v: number[]): void;
    /**
     * Set world space translation
     *
     * Applies the inverse parent transform with a new translation dual quaternion
     * which is concatenated onto the existing rotation.
     *
     * @param {number[]} v New world translation array/vector, expected to
     *                       have at least 3 elements.
     */
    setTranslationWorld(v: number[]): void;
    /**
     * Set world transform.
     *
     * @param {number} t Global / world space transformation
     *
     * @since 0.8.5
     */
    set transformWorld(arg: Float32Array);
    /**
     * May recompute transformations of the hierarchy of this object,
     * if they were been by JavaScript components this frame.
     *
     * @returns {Float32Array} Global / world space transformation
     */
    get transformWorld(): Float32Array;
    /**
     * Set scaling local
     *
     * @param {number[]} t Global / world space transformation
     *
     * @since 0.8.7
     */
    set scalingLocal(arg: Float32Array);
    /** @returns {Float32Array} Local / object space scaling */
    get scalingLocal(): Float32Array;
    /**
     * Set scaling world
     *
     * @param {number[]} t Global / world space transformation
     *
     * @since 0.8.7
     */
    set scalingWorld(arg: Float32Array);
    /**
     * @returns {Float32Array} Global / world space scaling
     *
     * May recompute transformations of the hierarchy of this object,
     * if they were been by JavaScript components this frame.
     */
    get scalingWorld(): Float32Array;
    /**
     * Set rotation local
     *
     * @param {number} r Local space rotation
     *
     * @since 0.8.7
     */
    set rotationLocal(arg: number[]);
    /**
     * @returns {number[]} Local space rotation
     *
     * @since 0.8.7
     */
    get rotationLocal(): number[];
    /**
     * Set rotation world
     *
     * @param {number} r Global / world space rotation
     *
     * @since 0.8.7
     */
    set rotationWorld(arg: number[]);
    /**
     * @returns {number[]} Global / world space rotation
     *
     * @since 0.8.7
     */
    get rotationWorld(): number[];
    /**
     * Compute the object's forward facing world space vector
     * @param {number[]} out Destination array/vector, expected to have at
     *                       least 3 elements.
     * @return {number[]} out
     */
    getForward(out: number[]): number[];
    /**
     * Compute the object's up facing world space vector
     * @param {number[]} out Destination array/vector, expected to have at
     *                       least 3 elements.
     * @return {number[]} out
     */
    getUp(out: number[]): number[];
    /**
     * Compute the object's right facing world space vector
     * @param {number[]} out Destination array/vector, expected to have at
     *                       least 3 elements.
     * @return {number[]} out
     */
    getRight(out: number[]): number[];
    /**
     * Transform a vector by this object's world transform
     *
     * @param {number[]} out Out point
     * @param {number[]} v Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformVectorWorld(out: number[], v: number[]): number[];
    /**
     * Transform a vector by this object's local transform
     *
     * @param {number[]} out Out point
     * @param {number[]} v Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformVectorLocal(out: number[], v: number[]): number[];
    /**
     * Transform a point by this object's world transform
     *
     * @param {number[]} out Out point
     * @param {number[]} v Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformPointWorld(out: number[], p: any): number[];
    /**
     * Transform a point by this object's local transform
     *
     * @param {number[]} out Out point
     * @param {number[]} v Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformPointLocal(out: number[], p: any): number[];
    /**
     * Transform a vector by this object's inverse world transform
     *
     * @param {number[]} out Out point
     * @param {number[]} v Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformVectorInverseWorld(out: number[], v: number[]): number[];
    /**
     * Transform a point by this object's inverse local transform
     *
     * @param {number[]} out Out point
     * @param {number[]} v Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformVectorInverseLocal(out: number[], v: number[]): number[];
    /**
     * Transform a point by this object's inverse world transform
     *
     * @param {number[]} out Out point
     * @param {number[]} v Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformPointInverseWorld(out: number[], p: any): number[];
    /**
     * Transform a point by this object's inverse local transform
     *
     * @param {number[]} out Out point
     * @param {number[]} p Point to transform, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    transformPointInverseLocal(out: number[], p: number[]): number[];
    /**
     * Transform a object space dual quaternion into world space
     *
     * @param {number[]} out Out transformation
     * @param {number[]} q Local space transformation, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    toWorldSpaceTransform(out: number[], q: number[]): number[];
    /**
     * Transform a world space dual quaternion into local space
     *
     * @param {number[]} out Out transformation
     * @param {number[]} q World space transformation, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    toLocalSpaceTransform(out: number[], q: number[]): number[];
    /**
     * Transform a world space dual quaternion into object space
     *
     * @param {number[]} out Out transformation
     * @param {number[]} q World space transformation, default `out`
     * @return {number[]} out
     *
     * @since 0.8.7
     */
    toObjectSpaceTransform(out: number[], q: number[]): number[];
    /**
     * Turn towards / look at target
     * @param {number[]} v Target vector to turn towards
     * @param {number[]} up Up vector of this object, default `[0, 1, 0]`
     */
    lookAt(v: number[], up?: number[]): void;
    /** Destroy the object and remove it from the scene */
    destroy(): void;
    /**
     * Mark transformation dirty
     *
     * Causes an eventual recalculation of {@link $Object#transformWorld}, either
     * on next {@link $Object#getTranslationWorld}, {@link $Object#transformWorld} or
     * {@link $Object#scalingWorld} or the beginning of next frame, whichever
     * happens first.
     */
    setDirty(): void;
    /**
     * Disable/enable all components of this object
     *
     * @param {boolean} b New state for the components
     * @since 0.8.5
     */
    set active(arg: boolean);
    /**
     * Get a component attached to this object
     * @param {string} type Type name
     * @param {number} index=0 Index for component of given type. This can be used to access specific
     *      components if the object has multiple components of the same type.
     * @returns {?(Component|CollisionComponent|TextComponent|ViewComponent|MeshComponent|InputComponent|LightComponent|AnimationComponent|PhysXComponent)} The component or {@link null} if there is no such component on this object
     */
    getComponent(type: string, index: number): (Component | CollisionComponent | TextComponent | ViewComponent | MeshComponent | InputComponent | LightComponent | AnimationComponent | PhysXComponent) | null;
    /**
     * @param {?string} type Type name, pass a falsey value (`undefined` or {@link null}) to retrieve all
     * @returns {Component[]} All components of given type attached to this object
     *
     * @warning This method will currently return at most 341 components.
     */
    getComponents(type: string | null): Component[];
    /**
     * Add component of given type to the object
     *
     * @param {string} type Typename to create a component of. Can be native or
     *      custom JavaScript component type.
     * @param {object} [params] Parameters to initialize properties of the new component
     *
     * @note As this function is non-trivial, avoid using it in `update()` repeatidly, but rather
     *  store its result in `init()` or `start()`
     * @returns {?(Component|CollisionComponent|TextComponent|ViewComponent|MeshComponent|InputComponent|LightComponent|AnimationComponent|PhysXComponent)} The component or {@link null} if the type was not found
     */
    addComponent(type: string, params?: object): (Component | CollisionComponent | TextComponent | ViewComponent | MeshComponent | InputComponent | LightComponent | AnimationComponent | PhysXComponent) | null;
    /**
     * Checks equality by comparing whether the wrapped native component ids
     * and component manager types are equal.
     *
     * @param {?$Object} otherObject Object to check equality with
     * @returns {boolean} Whether this object equals the given object
     */
    equals(otherObject: $Object | null): boolean;
}
/**
 * @summary Ray hit
 *
 * Result of a {@link Scene#rayCast|ray cast}
 *
 * @param {number} ptr Pointer to the ray hits memory
 * @note this class wraps internal engine data and should only be created
 * internally.
 */
export class RayHit {
    constructor(ptr: any);
    _ptr: any;
    /** @returns {Float32Array[]} array of ray hit locations */
    get locations(): Float32Array[];
    /** @returns {Float32Array[]} array of ray hit normals (only when using {@link Physics#rayCast} */
    get normals(): Float32Array[];
    /**
     * Prefer these to recalculating the distance from locations.
     *
     * @returns {number} Distances of array hits to ray origin
     */
    get distances(): number;
    /** @returns {$Object[]} Hit objects */
    get objects(): $Object[];
    /** @returns {number} Number of hits (max 4) */
    get hitCount(): number;
}
export class math {
    /** (Experimental!) Cubic Hermite spline interpolation for vector3 and quaternions.
     *
     * With `f == 0`, `out` will be `b`, if `f == 1`, `out` will be c.
     *
     * Whether a quaternion or vector3 interpolation is intended is determined by
     * legth of `a`.
     *
     * @param {number[]} out Array to write result to
     * @param {number[]} a First tangent/handle
     * @param {number[]} b First point or quaternion
     * @param {number[]} c Second point or quaternion
     * @param {number[]} d Second handle
     * @param {number} f Interpolation factor in [0; 1]
     * @returns {number[]} out
     * @since 0.8.6
     */
    static cubicHermite(out: number[], a: number[], b: number[], c: number[], d: number[], f: number): number[];
}
export { $Object as Object };
