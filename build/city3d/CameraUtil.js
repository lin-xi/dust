module("/build/city3d/CameraUtil.js", function () {
	var dust = require("/build/dust/Dust.js");
	var CONST = require("/build/city3d/Const.js");

	var CameraUtil = {
		
		/**
		 * 根据经纬度及半径，获取该点的三维坐标
		 * 
		 * @param	lon		经度（角度制）
		 * @param	lat		纬度（角度制）
		 * 
		 * @return	v		空间三维点
		 */
		lonlatTo3DPoint: function(lon, lat){
			var RADIUS = CONST.SPHERE_RADIUS;
			lon = lon * Math.PI / 180;
			lat = lat * Math.PI / 180;
			
			var sinlon = Math.sin(lon);
			var coslon = Math.cos(lon);
			var sinlat = Math.sin(lat);
			var coslat = Math.cos(lat);
			
			var vx =  coslat * coslon * RADIUS;
			var vy =  sinlat * RADIUS;
			var vz = -coslat * sinlon * RADIUS;

			return new dust.math.Vector3(vx, vy, vz);
		},

		/**
		 * 三维点转经纬度（笛卡尔坐标转球面坐标）
		 */
		CartesianToSpherical: function(x, y, z) {
			var point = {};
			
			var rho = Math.sqrt(x * x + y * y + z * z);
			var lon = Math.atan2(-z, x);
			var lat = Math.asin(y / rho);
			
			lon = lon / Math.PI * 180;
			lat = lat / Math.PI * 180;
			
			point.lng = lon;
			point.lat = lat;
			return point;
		},

	};

	return CameraUtil;
})