module("/build/dust/Light.js", function(){

    'use strict';

    var Node = require("/build/dust/Node.js");
    var Shader = require("/build/dust/Shader.js");

    /**
     * @constructor qtek.Light
     * @extends qtek.Node
     */
    var Light = Node.derive(function(){
        return /** @lends qtek.Light# */ {
            /**
             * Light RGB color
             * @type {number[]}
             */
            color: [1, 1, 1],

            /**
             * Light intensity
             * @type {number}
             */
            intensity: 1.0,
            
            // Config for shadow map
            /**
             * If light cast shadow
             * @type {boolean}
             */
            castShadow: true,

            /**
             * Shadow map size
             * @type {number}
             */
            shadowResolution: 512
        };
    },
    /** @lends qtek.Light.prototype. */
    {
        /**
         * Light type
         * @type {string}
         * @memberOf qtek.Light#
         */
        type: '',

        /**
         * @return {qtek.Light}
         * @memberOf qtek.Light.prototype
         */
        clone: function() {
            var light = Node.prototype.clone.call(this);
            light.color = Array.prototype.slice.call(this.color);
            light.intensity = this.intensity;
            light.castShadow = this.castShadow;
            light.shadowResolution = this.shadowResolution;

            return light;
        }
    });

    Shader['import']("@export buildin.header.directional_light\nuniform vec3 directionalLightDirection[ DIRECTIONAL_LIGHT_NUMBER ] : unconfigurable;\nuniform vec3 directionalLightColor[ DIRECTIONAL_LIGHT_NUMBER ] : unconfigurable;\n@end\n\n@export buildin.header.ambient_light\nuniform vec3 ambientLightColor[ AMBIENT_LIGHT_NUMBER ] : unconfigurable;\n@end\n\n@export buildin.header.point_light\nuniform vec3 pointLightPosition[ POINT_LIGHT_NUMBER ] : unconfigurable;\nuniform float pointLightRange[ POINT_LIGHT_NUMBER ] : unconfigurable;\nuniform vec3 pointLightColor[ POINT_LIGHT_NUMBER ] : unconfigurable;\n@end\n\n@export buildin.header.spot_light\nuniform vec3 spotLightPosition[SPOT_LIGHT_NUMBER] : unconfigurable;\nuniform vec3 spotLightDirection[SPOT_LIGHT_NUMBER] : unconfigurable;\nuniform float spotLightRange[SPOT_LIGHT_NUMBER] : unconfigurable;\nuniform float spotLightUmbraAngleCosine[SPOT_LIGHT_NUMBER] : unconfigurable;\nuniform float spotLightPenumbraAngleCosine[SPOT_LIGHT_NUMBER] : unconfigurable;\nuniform float spotLightFalloffFactor[SPOT_LIGHT_NUMBER] : unconfigurable;\nuniform vec3 spotLightColor[SPOT_LIGHT_NUMBER] : unconfigurable;\n@end");

    return Light;
});