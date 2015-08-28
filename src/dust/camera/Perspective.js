module(function() {

    'use strict';

    var Camera = require('../Camera');

    /**
     * @constructor dust.camera.Perspective
     * @extends dust.Camera
     */
    var Perspective = Camera.derive(
    /** @lends dust.camera.Perspective# */
    {
        /**
         * @type {number}
         */
        fov: 50,
        /**
         * @type {number}
         */
        aspect: 1,
        /**
         * @type {number}
         */
        near: 0.1,
        /**
         * @type {number}
         */
        far: 2000
    },
    /** @lends dust.camera.Perspective.prototype */
    {
        
        updateProjectionMatrix: function() {
            var rad = this.fov / 180 * Math.PI;
            this.projectionMatrix.perspective(rad, this.aspect, this.near, this.far);
        },
        /**
         * @return {dust.camera.Perspective}
         */
        clone: function() {
            var camera = Camera.prototype.clone.call(this);
            camera.fov = this.fov;
            camera.aspect = this.aspect;
            camera.near = this.near;
            camera.far = this.far;

            return camera;
        }
    });

    return Perspective;
});