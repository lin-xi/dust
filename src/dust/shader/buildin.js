module(function () {

    var library = require('./library');
    var Shader = require('../Shader');

    // Some build in shaders
    Shader['import'](__inline('./source/basic.sl'));
    Shader['import'](__inline('./source/lambert.sl'));
    Shader['import'](__inline('./source/phong.sl'));
    Shader['import'](__inline('./source/standard.sl'));
    Shader['import'](__inline('./source/wireframe.sl'));
    Shader['import'](__inline('./source/skybox.sl'));
    Shader['import'](__inline('./source/util.sl'));
    Shader['import'](__inline('./source/prez.sl'));

    Shader['import'](__inline('./source/shadowmap.sl'));

    library.template('buildin.basic', Shader.source('buildin.basic.vertex'), Shader.source('buildin.basic.fragment'));
    library.template('buildin.lambert', Shader.source('buildin.lambert.vertex'), Shader.source('buildin.lambert.fragment'));
    library.template('buildin.phong', Shader.source('buildin.phong.vertex'), Shader.source('buildin.phong.fragment'));
    library.template('buildin.wireframe', Shader.source('buildin.wireframe.vertex'), Shader.source('buildin.wireframe.fragment'));
    library.template('buildin.skybox', Shader.source('buildin.skybox.vertex'), Shader.source('buildin.skybox.fragment'));
    library.template('buildin.prez', Shader.source('buildin.prez.vertex'), Shader.source('buildin.prez.fragment'));
    library.template('buildin.standard', Shader.source('buildin.standard.vertex'), Shader.source('buildin.standard.fragment'));
    // Compatible with previous
    library.template('buildin.physical', Shader.source('buildin.physical.vertex'), Shader.source('buildin.physical.fragment'));

    // Some build in shaders
    Shader['import'](__inline('./source/compositor/coloradjust.sl'));
    Shader['import'](__inline('./source/compositor/blur.sl'));
    Shader['import'](__inline('./source/compositor/lum.sl'));
    Shader['import'](__inline('./source/compositor/lut.sl'));
    Shader['import'](__inline('./source/compositor/output.sl'));
    Shader['import'](__inline('./source/compositor/hdr.sl'));
    Shader['import'](__inline('./source/compositor/lensflare.sl'));
    Shader['import'](__inline('./source/compositor/blend.sl'));
    Shader['import'](__inline('./source/compositor/fxaa.sl'));

});