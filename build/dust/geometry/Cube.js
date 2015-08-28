module("/build/dust/geometry/Cube.js", function() {

    'use strict';

    var DynamicGeometry = require("/build/dust/DynamicGeometry.js");
    var Plane = require("/build/dust/geometry/Plane.js");
    var Matrix4 = require("/build/dust/math/Matrix4.js");
    var Vector3 = require("/build/dust/math/Vector3.js");
    var BoundingBox = require("/build/dust/math/BoundingBox.js");

    var planeMatrix = new Matrix4();
    
    /**
     * @constructor qtek.geometry.Cube
     * @extends qtek.DynamicGeometry
     * @param {Object} [opt]
     * @param {number} [opt.widthSegments]
     * @param {number} [opt.heightSegments]
     * @param {number} [opt.depthSegments]
     * @param {boolean} [opt.inside]
     */
    var Cube = DynamicGeometry.derive(
    /**@lends qtek.geometry.Cube# */
    {
        /**
         * @type {number}
         */
        widthSegments: 1,
        /**
         * @type {number}
         */
        heightSegments: 1,
        /**
         * @type {number}
         */
        depthSegments: 1,
        /**
         * @type {boolean}
         */
        inside: false
    }, function() {
        this.build();
    },
    /** @lends qtek.geometry.Cube.prototype */
    {
        /**
         * Build cube geometry
         */
        build: function() {
            
            this.faces.length = 0;
            this.attributes.position.value.length = 0;
            this.attributes.texcoord0.value.length = 0;
            this.attributes.normal.value.length = 0;

            var planes = {
                'px': createPlane('px', this.depthSegments, this.heightSegments),
                'nx': createPlane('nx', this.depthSegments, this.heightSegments),
                'py': createPlane('py', this.widthSegments, this.depthSegments),
                'ny': createPlane('ny', this.widthSegments, this.depthSegments),
                'pz': createPlane('pz', this.widthSegments, this.heightSegments),
                'nz': createPlane('nz', this.widthSegments, this.heightSegments),
            };
            var cursor = 0;
            var attrList = ['position', 'texcoord0', 'normal'];
            for (var pos in planes) {
                for (var k = 0; k < attrList.length; k++) {
                    var attrName = attrList[k];
                    var attrArray = planes[pos].attributes[attrName].value;
                    for (var i = 0; i < attrArray.length; i++) {
                        var value = attrArray[i];
                        if (this.inside && attrName === 'normal') {
                            value[0] = -value[0];
                            value[1] = -value[1];
                            value[2] = -value[2];
                        }
                        this.attributes[attrName].value.push(value);
                    }
                }
                var plane = planes[pos];
                for (var i = 0; i < plane.faces.length; i++) {
                    var face = plane.faces[i];
                    this.faces.push([face[0]+cursor, face[1]+cursor, face[2]+cursor]);
                }

                cursor += planes[pos].getVertexNumber();
            }

            this.boundingBox = new BoundingBox();
            this.boundingBox.max.set(1, 1, 1);
            this.boundingBox.min.set(-1, -1, -1);
        }
    });

    function createPlane(pos, widthSegments, heightSegments) {

        planeMatrix.identity();

        var plane = new Plane({
            widthSegments: widthSegments,
            heightSegments: heightSegments
        });

        switch(pos) {
            case 'px':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.POSITIVE_X);
                Matrix4.rotateY(planeMatrix, planeMatrix, Math.PI / 2);
                break;
            case 'nx':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.NEGATIVE_X);
                Matrix4.rotateY(planeMatrix, planeMatrix, -Math.PI / 2);
                break;
            case 'py':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.POSITIVE_Y);
                Matrix4.rotateX(planeMatrix, planeMatrix, -Math.PI / 2);
                break;
            case 'ny':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.NEGATIVE_Y);
                Matrix4.rotateX(planeMatrix, planeMatrix, Math.PI / 2);
                break;
            case 'pz':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.POSITIVE_Z);
                break;
            case 'nz':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.NEGATIVE_Z);
                Matrix4.rotateY(planeMatrix, planeMatrix, Math.PI);
                break;
        }
        plane.applyTransform(planeMatrix);
        return plane;
    }

    return Cube;
});