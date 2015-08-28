module(function(){

	var dust = {
		"core": {
			"Base": require('./core/Base'),
			"Cache": require('./core/Cache'),
			"Event": require('./core/Event'),
			"LRU": require('./core/LRU'),
			"LinkedList": require('./core/LinkedList'),
			"mixin": {
				"derive": require('./core/mixin/derive'),
				"notifier": require('./core/mixin/notifier')
			},
			"request": require('./core/request'),
			"util": require('./core/util')
		},
		"glenum": require('./glenum'),
		"glinfo": require('./glinfo'),
		"glmatrix": require('./glmatrix'),
		"math": {
			"BoundingBox": require('./math/BoundingBox'),
			"Frustum": require('./math/Frustum'),
			"Matrix2": require('./math/Matrix2'),
			"Matrix2d": require('./math/Matrix2d'),
			"Matrix3": require('./math/Matrix3'),
			"Matrix4": require('./math/Matrix4'),
			"Plane": require('./math/Plane'),
			"Quaternion": require('./math/Quaternion'),
			"Ray": require('./math/Ray'),
			"Value": require('./math/Value'),
			"Vector2": require('./math/Vector2'),
			"Vector3": require('./math/Vector3'),
			"Vector4": require('./math/Vector4')
		},
		
		"Node": require('./Node'),
		"Shader": require('./Shader'),
		"Renderable": require('./Renderable'),
		"Renderer": require('./Renderer'),
		"Scene": require('./Scene'),
		"Texture": require('./Texture'),
		"Texture2D": require('./Texture2D'),
		"TextureCube": require('./TextureCube'),
		"Material": require('./Material'),
		"Mesh": require('./Mesh'),
		"Joint": require('./Joint'),
		"Light": require('./Light'),
		"Skeleton": require('./Skeleton'),
		"camera": {
			"Orthographic": require('./camera/Orthographic'),
			"Perspective": require('./camera/Perspective')
		},
		"light": {
			"Ambient": require('./light/Ambient'),
			"Directional": require('./light/Directional'),
			"Point": require('./light/Point'),
			"Spot": require('./light/Spot')
		},
		"StaticGeometry": require('./StaticGeometry'),
		"geometry": {
			"Cone": require('./geometry/Cone'),
			"Cube": require('./geometry/Cube'),
			"Cylinder": require('./geometry/Cylinder'),
			"Plane": require('./geometry/Plane'),
			"Sphere": require('./geometry/Sphere')
		},
		"compositor": {
			"Compositor": require('./compositor/Compositor'),
			"Graph": require('./compositor/Graph'),
			"Node": require('./compositor/Node'),
			"Pass": require('./compositor/Pass'),
			"SceneNode": require('./compositor/SceneNode'),
			"TextureNode": require('./compositor/TextureNode'),
			"TexturePool": require('./compositor/TexturePool')
		},
		"animation": {
			"Animation": require('./animation/Animation'),
			"Blend1DClip": require('./animation/Blend1DClip'),
			"Blend2DClip": require('./animation/Blend2DClip'),
			"Clip": require('./animation/Clip'),
			"SamplerClip": require('./animation/SamplerClip'),
			"SkinningClip": require('./animation/SkinningClip'),
			"TransformClip": require('./animation/TransformClip'),
			"easing": require('./animation/easing')
		},
		"shader": {
			"buildin": require('./shader/buildin'),
			"library": require('./shader/library')
		},
		"plugin": {
			"FirstPersonControl": require('./plugin/FirstPersonControl'),
			"InfinitePlane": require('./plugin/InfinitePlane'),
			"OrbitControl": require('./plugin/OrbitControl'),
			"Skybox": require('./plugin/Skybox'),
			"Skydome": require('./plugin/Skydome')
		},
		"util": {
			"dds": require('./util/dds'),
			"delaunay": require('./util/delaunay'),
			"hdr": require('./util/hdr'),
			"mesh": require('./util/mesh'),
			"texture": require('./util/texture')
		},
		"loader": {
			"FX": require('./loader/FX'),
			"GLTF": require('./loader/GLTF'),
			"ThreeModel": require('./loader/ThreeModel')
		},
	}

	return dust;

});