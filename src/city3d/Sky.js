module(function() {
    var dust = require('../dust/Dust.js');

    function Sky(scene){
        this.initialize(scene);
    }

    Sky.prototype.initialize = function(scene){

        var skyTex = new dust.TextureCube({flipY : false});
        skyTex.load({
            'px': '/assets/textures/sky/space_posX.jpg',
            'nx': 'assets/textures/sky/space_negX.jpg',
            'py': 'assets/textures/sky/space_posY.jpg',
            'ny': 'assets/textures/sky/space_negY.jpg',
            'pz': 'assets/textures/sky/space_posZ.jpg',
            'nz': 'assets/textures/sky/space_negZ.jpg'
        });
        var skybox = new dust.plugin.Skybox({
            scene: scene
        });
        skybox.material.set('environmentMap', skyTex);
    }
    return Sky;

});