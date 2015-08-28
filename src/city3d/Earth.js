module(function() {
    var dust = require('../dust/Dust.js');
    var CONST = require('./Const.js');

    function Earth(scene){
        this.initialize(scene);
    }

    Earth.prototype.initialize = function(scene){
        var shader = dust.shader.library.get('buildin.basic', 'diffuseMap');
        var material = new dust.Material({
            shader : shader
        });

        var diffuse = new dust.Texture2D();
        diffuse.load("/assets/textures/tile_1_0_0.jpg");
        material.set('diffuseMap', diffuse);

        var sphere = new dust.geometry.Sphere({radius: CONST.SPHERE_RADIUS});
        sphere.generateBarycentric();

        this.mesh = new dust.Mesh({
            geometry: sphere,
            material: material
        });
        
    }
    return Earth;

});