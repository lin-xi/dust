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
    var relays = [];
    relays.push('/build/dust/Dust.js');
    relays.push('/build/city3d/Sky.js');
    relays.push('/build/city3d/Earth.js');
    relays.push('/build/city3d/CameraUtil.js');
    relays.push('/build/city3d/Const.js');

	use(relays, function(dust, Sky, Earth, CameraUtil, CONST){
		
        var Shader = dust.Shader;
        var scene = new dust.Scene;
        var renderer = new dust.Renderer({
            canvas : document.getElementById("Main")
        });
        renderer.resize(window.innerWidth, window.innerHeight-2);
        var animation = new dust.animation.Animation();
        animation.start();

        var camera = this.camera = new dust.camera.Perspective({
            aspect : renderer.canvas.width / renderer.canvas.height,
            far : 500
        });

        var root = new dust.Node({name: 'ROOT'});
        scene.add(root);

        new Sky(scene);
        var earth = new Earth(scene);
        root.add(earth.mesh);

        scene.add(new dust.light.Ambient({
            intensity: 0.3
        }));

        var control = new dust.plugin.OrbitControl({
            target : camera,
            domElement : renderer.canvas,
            sensitivity : 0.4
        });

        var p = CameraUtil.lonlatTo3DPoint(0, 0);
        camera.position.set(0, 0, CONST.SPHERE_RADIUS*4);
        camera.lookAt(new dust.math.Vector3(0, 0, 0));

        renderer.render(scene, camera);
        animation.on('frame', function(deltaTime) {
            control.update();
            renderer.render(scene, camera);
        });

    });
            
}


function gotoDaLian(){

}