module(function() {

    'use strict';

    var Node = require('./Node');
    var Matrix4 = require('./math/Matrix4');
    var Frustum = require('./math/Frustum');
    var BoundingBox = require('./math/BoundingBox');
    var Ray = require('./math/Ray');

    var glMatrix = require('./glmatrix');
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;
    var vec4 = glMatrix.vec4;

    /**
     * @constructor dust.Camera
     * @extends dust.Node
     */
    var Camera = Node.derive(function() {
        return /** @lends dust.Camera# */ {
            /**
             * Camera projection matrix
             * @type {dust.math.Matrix4}
             */
            projectionMatrix: new Matrix4(),

            /**
             * Inverse of camera projection matrix
             * @type {dust.math.Matrix4}
             */
            invProjectionMatrix: new Matrix4(),

            /**
             * View matrix, equal to inverse of camera's world matrix
             * @type {dust.math.Matrix4}
             */
            viewMatrix: new Matrix4(),

            /**
             * Camera frustum in view space
             * @type {dust.math.Frustum}
             */
            frustum: new Frustum(),

            /**
             * Scene bounding box in view space.
             * Used when camera needs to adujst the near and far plane automatically
             * so that the view frustum contains the visible objects as tightly as possible.
             * Notice:
             *  It is updated after rendering (in the step of frustum culling passingly). So may be not so accurate, but saves a lot of calculation
             *  
             * @type {dust.math.BoundingBox}
             */
            //TODO In case of one camera to multiple scenes
            sceneBoundingBoxLastFrame: new BoundingBox()
        };
    }, function() {
        this.update(true);
    },
    /** @lends dust.Camera.prototype */
    {
        
        update: function(force) {
            Node.prototype.update.call(this, force);
            mat4.invert(this.viewMatrix._array, this.worldTransform._array);
            
            this.updateProjectionMatrix();
            mat4.invert(this.invProjectionMatrix._array, this.projectionMatrix._array);

            this.frustum.setFromProjection(this.projectionMatrix);
        },
        /**
         * Update projection matrix, called after update
         */
        updateProjectionMatrix: function(){},

        /**
         * Cast a picking ray from camera near plane to far plane
         * @method
         * @param {dust.math.Vector2} ndc
         * @param {dust.math.Ray} [out]
         * @return {dust.math.Ray}
         */
        castRay: (function() {
            var v4 = vec4.create();
            return function(ndc, out) {
                var ray = out !== undefined ? out : new Ray();
                var x = ndc._array[0];
                var y = ndc._array[1];
                vec4.set(v4, x, y, -1, 1);
                vec4.transformMat4(v4, v4, this.invProjectionMatrix._array);
                vec4.transformMat4(v4, v4, this.worldTransform._array);
                vec3.scale(ray.origin._array, v4, 1 / v4[3]);

                vec4.set(v4, x, y, 1, 1);
                vec4.transformMat4(v4, v4, this.invProjectionMatrix._array);
                vec4.transformMat4(v4, v4, this.worldTransform._array);
                vec3.scale(v4, v4, 1 / v4[3]);
                vec3.sub(ray.direction._array, v4, ray.origin._array);

                vec3.normalize(ray.direction._array, ray.direction._array);
                ray.direction._dirty = true;
                ray.origin._dirty = true;
                
                return ray;
            };
        })()

        /**
         * @method
         * @name clone
         * @return {dust.Camera}
         * @memberOf dust.Camera.prototype
         */
    });

    return Camera;
});