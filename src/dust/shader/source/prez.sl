// Shader for prez pass
@export buildin.prez.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec3 position : POSITION;

#ifdef SKINNING
attribute vec3 weight : WEIGHT;
attribute vec4 joint : JOINT;

uniform mat4 skinMatrix[JOINT_NUMBER] : SKIN_MATRIX;
#endif

void main()
{

    vec3 skinnedPosition = position;

    #ifdef SKINNING
        
        @import buildin.chunk.skin_matrix
        
        skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;
    #endif
    
    gl_Position = worldViewProjection * vec4(skinnedPosition, 1.0);
}

@end


@export buildin.prez.fragment

void main()
{
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}

@end