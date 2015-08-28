module("/build/city3d/CityCamera.js", function(){
	var dust = require("/build/dust/Dust.js");
	var util = require("/build/city3d/util.js");
	var CONST = require("/build/city3d/Const.js");


	function CityCamera(opt){
		this.lng = opt.lng;
		this.lat = opt.lat;
		this.distance = opt.distance;
		this.rotationX = opt.rotationX;
		this.rotationZ = opt.rotationZ;

		this.intialize();
	}

	


	return CityCamera;
});