module("/build/city3d/Const.js", function (argument) {

	var SPHERE_RADIUS = 63.78137;

	var CONST = {
		//地球半径
		"SPHERE_RADIUS": SPHERE_RADIUS,
		//摄像机的初始位置
		"CAMERA_INIT_DISTANCE": SPHERE_RADIUS * 2
	}

	return CONST;
});