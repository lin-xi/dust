module(function(){
	var dust = require('../dust/Dust.js');
	var util = require('./util.js');
	var CONST = require('./Const.js');


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