document.body.onload = load;

function $(selector){
	var elems = document.querySelectorAll(selector);
	if(elems.length == 1){
		return elems[0];
	}else{
		return elems;
	}
}

function load(){

	use('/build/dust/Dust.js', function(dust){
		
        var Shader = dust.Shader;
        var Material = dust.Material;
        var Mesh = dust.Mesh;
        var Cube = dust.geometry.Cube;
        var meshUtil = dust.util.mesh;
        var shaderLibrary = dust.shader.library;
        var animation = new dust.animation.Animation;
        animation.start();

        var renderer = new dust.Renderer({
            canvas : document.getElementById("Main"),
            devicePixelRatio : 1.0
        });
        renderer.resize(window.innerWidth, window.innerHeight);
        var scene = new dust.Scene;
        var camera = new dust.camera.Perspective({
            aspect : renderer.canvas.width/renderer.canvas.height,
            far : 500
        });

	    var cube = new Cube();
	    cube.generateTangents();
	    var shader = shaderLibrary.get('buildin.standard', 'diffuseMap', 'normalMap');
	    var material = new Material({
	        shader : shader
	    });
        material.set('glossiness', 0.4);
        var diffuse = new dust.Texture2D;
        diffuse.load("/assets/textures/crate.gif");
        var normal = new dust.Texture2D;
        normal.load("/assets/textures/normal_map.jpg");
        material.set('diffuseMap', diffuse);
        material.set('normalMap', normal);

	    var root = new dust.Node({
	        name : 'ROOT'
	    });
	    scene.add(root);
	    var cube = new Mesh({
	        geometry: cube,
	        material: material
	    });
        for( var i = 0; i < 20; i++){
            for(var j = 0; j < 10; j++){
                for( var k = 0; k < 50; k++){
                    var mesh = cube.clone();
                    mesh.position.set(50-Math.random()*100, 50-Math.random()*100, 50-Math.random()*100);
                    root.add(mesh);
                }
            }
        }
        var light = new dust.light.Point({
            range: 200
        });
        scene.add(light);
        scene.add(new dust.light.Ambient({
            intensity: 0.4
        }))

        camera.position.set(0, 0, 10);

        animation.on('frame', function(deltaTime) {
            var start = new Date().getTime();
            var drawInfo = renderer.render(scene, camera);
            var renderTime = new Date().getTime() - start;
            document.getElementById('time').innerHTML = 
                    Math.round(1000 / deltaTime) + '<br />' 
                    + renderTime + '<br />'
                    + drawInfo.renderedMeshNumber + '(' + drawInfo.meshNumber + ')';
            // near z is larger than far z in view space
            camera.far = Math.max(camera.near, -camera.sceneBoundingBoxLastFrame.min.z);
            root.rotation.rotateY(Math.PI/500);
        });
    });
            
}