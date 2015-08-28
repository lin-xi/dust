module("/build/dust/prePass/Reflection.js", function() {

    var Base = require("/build/dust/core/Base.js");
    var Vector4 = require("/build/dust/math/Vector4.js");

    var ReflectionPass = Base.derive(function() {
        console.warn('TODO');
    }, {
        render : function(renderer, scene, camera) {

        }
    });

    return ReflectionPass;
});