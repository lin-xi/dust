module("/build/dust/Dust.js", function(){

	var dust = {
		"core": {
			"Base": require("/build/dust/core/Base.js"),
			"Cache": require("/build/dust/core/Cache.js"),
			"Event": require("/build/dust/core/Event.js"),
			"LRU": require("/build/dust/core/LRU.js"),
			"LinkedList": require("/build/dust/core/LinkedList.js"),
			"mixin": {
				"derive": require("/build/dust/core/mixin/derive.js"),
				"notifier": require("/build/dust/core/mixin/notifier.js")
			},
			"request": require("/build/dust/core/request.js"),
			"util": require("/build/dust/core/util.js")
		},
		"glenum": require("/build/dust/glenum.js"),
		"glinfo": require("/build/dust/glinfo.js"),
		"glmatrix": require("/build/dust/glmatrix.js"),
		"math": {
			"BoundingBox": require("/build/dust/math/BoundingBox.js"),
			"Frustum": require("/build/dust/math/Frustum.js"),
			"Matrix2": require("/build/dust/math/Matrix2.js"),
			"Matrix2d": require("/build/dust/math/Matrix2d.js"),
			"Matrix3": require("/build/dust/math/Matrix3.js"),
			"Matrix4": require("/build/dust/math/Matrix4.js"),
			"Plane": require("/build/dust/math/Plane.js"),
			"Quaternion": require("/build/dust/math/Quaternion.js"),
			"Ray": require("/build/dust/math/Ray.js"),
			"Value": require("/build/dust/math/Value.js"),
			"Vector2": require("/build/dust/math/Vector2.js"),
			"Vector3": require("/build/dust/math/Vector3.js"),
			"Vector4": require("/build/dust/math/Vector4.js")
		},
		
		"Node": require("/build/dust/Node.js"),
		"Shader": require("/build/dust/Shader.js"),
		"Renderable": require("/build/dust/Renderable.js"),
		"Renderer": require("/build/dust/Renderer.js"),
		"Scene": require("/build/dust/Scene.js"),
		"Texture": require("/build/dust/Texture.js"),
		"Texture2D": require("/build/dust/Texture2D.js"),
		"TextureCube": require("/build/dust/TextureCube.js"),
		"Material": require("/build/dust/Material.js"),
		"Mesh": require("/build/dust/Mesh.js"),
		"Joint": require("/build/dust/Joint.js"),
		"Light": require("/build/dust/Light.js"),
		"Skeleton": require("/build/dust/Skeleton.js"),
		"camera": {
			"Orthographic": require("/build/dust/camera/Orthographic.js"),
			"Perspective": require("/build/dust/camera/Perspective.js")
		},
		"light": {
			"Ambient": require("/build/dust/light/Ambient.js"),
			"Directional": require("/build/dust/light/Directional.js"),
			"Point": require("/build/dust/light/Point.js"),
			"Spot": require("/build/dust/light/Spot.js")
		},
		"StaticGeometry": require("/build/dust/StaticGeometry.js"),
		"geometry": {
			"Cone": require("/build/dust/geometry/Cone.js"),
			"Cube": require("/build/dust/geometry/Cube.js"),
			"Cylinder": require("/build/dust/geometry/Cylinder.js"),
			"Plane": require("/build/dust/geometry/Plane.js"),
			"Sphere": require("/build/dust/geometry/Sphere.js")
		},
		"compositor": {
			"Compositor": require("/build/dust/compositor/Compositor.js"),
			"Graph": require("/build/dust/compositor/Graph.js"),
			"Node": require("/build/dust/compositor/Node.js"),
			"Pass": require("/build/dust/compositor/Pass.js"),
			"SceneNode": require("/build/dust/compositor/SceneNode.js"),
			"TextureNode": require("/build/dust/compositor/TextureNode.js"),
			"TexturePool": require("/build/dust/compositor/TexturePool.js")
		},
		"animation": {
			"Animation": require("/build/dust/animation/Animation.js"),
			"Blend1DClip": require("/build/dust/animation/Blend1DClip.js"),
			"Blend2DClip": require("/build/dust/animation/Blend2DClip.js"),
			"Clip": require("/build/dust/animation/Clip.js"),
			"SamplerClip": require("/build/dust/animation/SamplerClip.js"),
			"SkinningClip": require("/build/dust/animation/SkinningClip.js"),
			"TransformClip": require("/build/dust/animation/TransformClip.js"),
			"easing": require("/build/dust/animation/easing.js")
		},
		"shader": {
			"buildin": require("/build/dust/shader/buildin.js"),
			"library": require("/build/dust/shader/library.js")
		},
		"plugin": {
			"FirstPersonControl": require("/build/dust/plugin/FirstPersonControl.js"),
			"InfinitePlane": require("/build/dust/plugin/InfinitePlane.js"),
			"OrbitControl": require("/build/dust/plugin/OrbitControl.js"),
			"Skybox": require("/build/dust/plugin/Skybox.js"),
			"Skydome": require("/build/dust/plugin/Skydome.js")
		},
		"util": {
			"dds": require("/build/dust/util/dds.js"),
			"delaunay": require("/build/dust/util/delaunay.js"),
			"hdr": require("/build/dust/util/hdr.js"),
			"mesh": require("/build/dust/util/mesh.js"),
			"texture": require("/build/dust/util/texture.js")
		},
		"loader": {
			"FX": require("/build/dust/loader/FX.js"),
			"GLTF": require("/build/dust/loader/GLTF.js"),
			"ThreeModel": require("/build/dust/loader/ThreeModel.js")
		},
	}

	return dust;

});