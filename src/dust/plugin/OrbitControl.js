module(function() {

    var Base = require('../core/Base');
    var Vector3 = require('../math/Vector3');
    var Matrix4 = require('../math/Matrix4');

    /**
     * @constructor qtek.plugin.OrbitControl
     *
     * @example
     * 
     *     var control = new qtek.plugin.OrbitControl({
     *         target: camera,
     *         domElement: renderer.canvas
     *     });
     *     // Rotate around car
     *     control.origin.copy(car.position);
     *     ...
     *     animation.on('frame', function(frameTime) {
     *         control.update(frameTime);
     *         renderer.render(scene, camera);
     *     });
     */
    var OrbitControl = Base.derive(function() {
        return /** @lends qtek.plugin.OrbitControl# */ {
            /**
             * Scene node to control, mostly it is a camera
             * @type {qtek.Node}
             */
            target: null,

            /**
             * Target dom to bind with mouse events
             * @type {HTMLElement}
             */
            domElement: null,

            /**
             * Mouse move sensitivity
             * @type {number}
             */
            sensitivity: 1,

            /**
             * Origin to rotate around
             * @type {qtek.math.Vector3}
             */
            origin: new Vector3(),

            /**
             * Up axis
             * @type {qtek.math.Vector3}
             */
            up: new Vector3(0, 1, 0),

            /**
             * Minimum distance from origin to target when zooming in
             * @type {number}
             */
            minDistance: 0,
            /**
             * Maximum distance from origin to target when zooming out
             * @type {number}
             */
            maxDistance: Infinity,

            /**
             * Minimum polar angle when rotate up, it is 0 when the direction origin point to target is same with up axis
             * @type {number}
             */
            minPolarAngle: 0, // [0, Math.PI/2]

            /**
             * Maximum polar angle when rotate down. It is PI when the direction origin point to target is opposite to up axis
             * @type {number}
             */
            maxPolarAngle: Math.PI, // [Math.PI/2, Math.PI]

            // Rotate around origin
            _offsetPitch: 0,
            _offsetRoll: 0,

            // Pan the origin
            _panX: 0,
            _panY: 0,

            // Offset of mouse move
            _offsetX: 0,
            _offsetY: 0,

            // Zoom with mouse wheel
            _forward: 0,

            _op: -1  //0: ROTATE, 1: PAN
        };
    }, function() {
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        this._mouseOut = this._mouseOut.bind(this);
        this._mouseWheel = this._mouseWheel.bind(this);

        if (this.domElement) {
            this.enable();
        }
    },
    /** @lends qtek.plugin.OrbitControl.prototype */
    {
        /**
         * Enable control
         */
        enable: function() {
            this.domElement.addEventListener('mousedown', this._mouseDown);
            this.domElement.addEventListener('mousewheel', this._mouseWheel);
            this.domElement.addEventListener('DOMMouseScroll', this._mouseWheel);
        },

        /**
         * Disable control
         */
        disable: function() {
            this.domElement.removeEventListener('mousedown', this._mouseDown);
            this.domElement.removeEventListener('mousewheel', this._mouseWheel);
            this.domElement.removeEventListener('DOMMouseScroll', this._mouseWheel);
            this._mouseUp();
        },

        _mouseWheel: function(e) {
            e.preventDefault();
            var delta = e.wheelDelta // Webkit 
                        || -e.detail; // Firefox

            this._forward += delta * this.sensitivity;
        },

        _mouseDown: function(e) {
            document.addEventListener('mousemove', this._mouseMove);
            document.addEventListener('mouseup', this._mouseUp);
            document.addEventListener('mouseout', this._mouseOut);

            this._offsetX = e.pageX;
            this._offsetY = e.pageY;

            // Rotate
            if (e.button === 0) {
                this._op = 0;
            } else if (e.button === 1) {
                this._op = 1;
            }
        },

        _mouseMove: function(e) {
            var dx = e.pageX - this._offsetX;
            var dy = e.pageY - this._offsetY;

            if (this._op === 0) {
                this._offsetPitch += dx * this.sensitivity / 100;
                this._offsetRoll += dy * this.sensitivity / 100;
            } else if (this._op === 1) {
                var len = this.origin.distance(this.target.position);
                var divider;
                if (this.target.fov) {
                    divider = Math.sin(this.target.fov * Math.PI / 360) / 200;
                } else {
                    divider = 1 / 200;
                }
                this._panX += dx * this.sensitivity * len * divider;
                this._panY += dy * this.sensitivity * len * divider;
            }

            this._offsetX = e.pageX;
            this._offsetY = e.pageY;
        },

        _mouseUp: function() {

            document.removeEventListener('mousemove', this._mouseMove);
            document.removeEventListener('mouseup', this._mouseUp);
            document.removeEventListener('mouseout', this._mouseOut);

            this._op = -1;
        },

        _mouseOut: function() {
            this._mouseUp();
        },

        /**
         * Control update. Should be invoked every frame
         * @param {number} frameTime Frame time
         */
        update: function(frameTime) {
            var target = this.target;
            var zAxis = target.localTransform.z.normalize();
            var yAxis = target.localTransform.y.normalize();
            if (this._op === 0 && this._offsetPitch !== 0 && this._offsetRoll !== 0) {
                // Rotate
                target.rotateAround(this.origin, this.up, -this._offsetPitch);
                var xAxis = target.localTransform.x;
                target.rotateAround(this.origin, xAxis, -this._offsetRoll);

                var zAxis = target.worldTransform.z.normalize();
                var phi = Math.acos(this.up.dot(zAxis));
                // Rotate back a bit
                if (this._offsetRoll > 0 && phi <= this.minPolarAngle) {
                    target.rotateAround(this.origin, xAxis, -phi + this.minPolarAngle);
                }
                else if (this._offsetRoll < 0 && phi >= this.maxPolarAngle) {
                    target.rotateAround(this.origin, xAxis, -phi + this.maxPolarAngle);
                }
                this._offsetRoll = this._offsetPitch = 0;
            } else if (this._op === 1) {
                // Pan
                var xAxis = target.localTransform.x.normalize().scale(-this._panX);
                var yAxis = target.localTransform.y.normalize().scale(this._panY);
                target.position.add(xAxis).add(yAxis);
                this.origin.add(xAxis).add(yAxis);
                this._panX = this._panY = 0;
            } 
            if (this._forward !== 0) {
                // Zoom
                var distance = target.position.distance(this.origin);
                var nextDistance = distance + this._forward * distance / 5000;
                if (nextDistance < this.maxDistance && nextDistance > this.minDistance) {
                    target.position.scaleAndAdd(zAxis, this._forward * distance / 5000);
                }
                this._forward = 0;
            }

        }
    });

    return OrbitControl;
});