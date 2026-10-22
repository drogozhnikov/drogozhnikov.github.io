// Sakura WebGL scene from https://codepen.io/at80/pen/kyOdeK (Anand Davaasuren).
export const sakura_point_vsh = `
uniform mat4 uProjection;
uniform mat4 uModelview;
uniform vec3 uResolution;
uniform vec3 uOffset;
uniform vec3 uDOF;  //x:focus distance, y:focus radius, z:max radius
uniform vec3 uFade; //x:start distance, y:half distance, z:near fade start
uniform float uShape;

attribute vec3 aPosition;
attribute vec3 aEuler;
attribute vec2 aMisc; //x:size, y:fade

varying vec3 pposition;
varying float psize;
varying float palpha;
varying float pdist;

//varying mat3 rotMat;
varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 normal;

varying float diffuse;
varying float specular;
varying float rstop;
varying float distancefade;

void main(void) {
    // Projection is based on vertical angle
    vec4 pos = uModelview * vec4(aPosition + uOffset, 1.0);
    gl_Position = uProjection * pos;
    float spritePad = (uShape > 0.5 && uShape < 1.5) ? 2.0 : 1.0;
    gl_PointSize = aMisc.x * uProjection[1][1] / -pos.z * uResolution.y * 0.5 * spritePad;
    
    pposition = pos.xyz;
    psize = aMisc.x;
    pdist = length(pos.xyz);
    palpha = smoothstep(0.0, 1.0, (pdist - 0.1) / uFade.z);
    
    vec3 elrsn = sin(aEuler);
    vec3 elrcs = cos(aEuler);
    mat3 rotx = mat3(
        1.0, 0.0, 0.0,
        0.0, elrcs.x, elrsn.x,
        0.0, -elrsn.x, elrcs.x
    );
    mat3 roty = mat3(
        elrcs.y, 0.0, -elrsn.y,
        0.0, 1.0, 0.0,
        elrsn.y, 0.0, elrcs.y
    );
    mat3 rotz = mat3(
        elrcs.z, elrsn.z, 0.0, 
        -elrsn.z, elrcs.z, 0.0,
        0.0, 0.0, 1.0
    );
    mat3 rotmat = rotx * roty * rotz;
    normal = rotmat[2];
    
    mat3 trrotm = mat3(
        rotmat[0][0], rotmat[1][0], rotmat[2][0],
        rotmat[0][1], rotmat[1][1], rotmat[2][1],
        rotmat[0][2], rotmat[1][2], rotmat[2][2]
    );
    normX = trrotm[0];
    normY = trrotm[1];
    normZ = trrotm[2];
    
    const vec3 lit = vec3(0.6917144638660746, 0.6917144638660746, -0.20751433915982237);
    
    float tmpdfs = dot(lit, normal);
    if(tmpdfs < 0.0) {
        normal = -normal;
        tmpdfs = dot(lit, normal);
    }
    diffuse = 0.4 + tmpdfs;
    
    vec3 eyev = normalize(-pos.xyz);
    if(dot(eyev, normal) > 0.0) {
        vec3 hv = normalize(eyev + lit);
        specular = pow(max(dot(hv, normal), 0.0), 20.0);
    }
    else {
        specular = 0.0;
    }
    
    rstop = clamp((abs(pdist - uDOF.x) - uDOF.y) / uDOF.z, 0.0, 1.0);
    rstop = pow(rstop, 0.5);
    //-0.69315 = ln(0.5)
    distancefade = min(1.0, exp((uFade.x - pdist) * 0.69315 / uFade.y));
}
`;
export const sakura_point_fsh = `
#ifdef GL_ES
//precision mediump float;
precision highp float;
#endif

uniform vec3 uDOF;  //x:focus distance, y:focus radius, z:max radius
uniform vec3 uFade; //x:start distance, y:half distance, z:near fade start
uniform float uShape;

const vec3 fadeCol = vec3(0.08, 0.03, 0.06);

varying vec3 pposition;
varying float psize;
varying float palpha;
varying float pdist;

//varying mat3 rotMat;
varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 normal;

varying float diffuse;
varying float specular;
varying float rstop;
varying float distancefade;

float ellipse(vec2 p, vec2 o, vec2 r) {
    vec2 lp = (p - o) / r;
    return length(lp) - 1.0;
}

float segment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

float arch(vec2 p, vec2 a, vec2 b, float sag) {
    vec2 mid = (a + b) * 0.5 + vec2(0.0, sag);
    return min(segment(p, a, mid), segment(p, mid, b));
}

void main(void) {
    vec3 p = vec3(gl_PointCoord - vec2(0.5, 0.5), 0.0) * 2.0;
    vec3 d = vec3(0.0, 0.0, -1.0);
    float nd = normZ.z;
    if(abs(nd) < 0.0001) discard;

    float np = dot(normZ, p);
    vec3 tp = p + d * np / nd;
    vec2 coord = vec2(dot(normX, tp), dot(normY, tp));

    if (uShape < 0.5) {
        const float flwrsn = 0.258819045102521;
        const float flwrcs = 0.965925826289068;
        mat2 flwrm = mat2(flwrcs, -flwrsn, flwrsn, flwrcs);
        vec2 flwrp = vec2(abs(coord.x), coord.y) * flwrm;

        float r;
        if(flwrp.x < 0.0) {
            r = ellipse(flwrp, vec2(0.065, 0.024) * 0.5, vec2(0.36, 0.96) * 0.5);
        }
        else {
            r = ellipse(flwrp, vec2(0.065, 0.024) * 0.5, vec2(0.58, 0.96) * 0.5);
        }

        if(r > rstop) discard;

        vec3 col = mix(vec3(1.0, 0.8, 0.75), vec3(1.0, 0.9, 0.87), r);
        float grady = mix(0.0, 1.0, pow(coord.y * 0.5 + 0.5, 0.35));
        col *= vec3(1.0, grady, grady);
        col *= mix(0.8, 1.0, pow(abs(coord.x), 0.3));
        col = col * diffuse + specular;

        col = mix(fadeCol, col, distancefade);

        float alpha = (rstop > 0.001)? (0.5 - r / (rstop * 2.0)) : 1.0;
        alpha = smoothstep(0.0, 1.0, alpha) * palpha;

        gl_FragColor = vec4(col * 0.5, alpha);
    } else if (uShape < 1.5) {
        float rlen = length(coord);
        float slen = rlen * 2.0;
        float ang = atan(coord.y, coord.x);
        float arms = pow(abs(cos(ang * 3.0)), 8.0);
        float body = slen - mix(0.72, 0.16, arms);
        float core = slen - 0.1;
        float r = min(body, core);
        if (r > rstop) discard;
        vec3 col = mix(vec3(0.75, 0.85, 0.95), vec3(1.0, 1.0, 1.0), clamp(1.0 - slen, 0.0, 1.0));
        col = col * diffuse + specular;
        col = mix(fadeCol, col, distancefade);
        float alpha = (rstop > 0.001) ? (0.5 - r / (rstop * 2.0)) : 1.0;
        alpha = smoothstep(0.0, 1.0, alpha) * palpha;
        gl_FragColor = vec4(col * 0.5, alpha);
    } else if (uShape < 2.5) {
        vec2 lp = coord;
        float baseY = -0.52;
        float tipY = 0.9;
        float t = clamp((lp.y - baseY) / (tipY - baseY), 0.0, 1.0);
        float profile = pow(max(t, 0.0001), 0.65) * pow(max(1.0 - t, 0.0001), 1.15) * 3.25;
        float halfW = profile * 0.68;
        float blade = abs(lp.x) - halfW;
        blade = max(blade, max(baseY - lp.y, lp.y - tipY));
        float stem = ellipse(lp - vec2(0.0, -0.78), vec2(0.0), vec2(0.042, 0.26));
        float r = min(blade, stem);
        if (r > rstop) discard;

        vec3 col = mix(vec3(1.0, 0.74, 0.16), vec3(0.9, 0.52, 0.08), smoothstep(-0.04, 0.06, lp.x));
        vec2 side = vec2(abs(lp.x), lp.y);
        float veins = segment(lp, vec2(0.0, -0.5), vec2(0.0, 0.7));
        veins = min(veins, arch(side, vec2(0.02, -0.16), vec2(0.5, 0.04), -0.1));
        veins = min(veins, arch(side, vec2(0.02, 0.06), vec2(0.38, 0.28), -0.05));
        veins = min(veins, arch(side, vec2(0.02, 0.28), vec2(0.24, 0.46), -0.02));
        veins = min(veins, arch(side, vec2(0.0, 0.48), vec2(0.13, 0.6), 0.0));
        float veinMask = 1.0 - smoothstep(0.026, 0.052, veins);
        float stemMask = (1.0 - smoothstep(-0.02, 0.02, stem)) * smoothstep(-0.4, -0.62, lp.y);
        col = mix(col, vec3(0.55, 0.32, 0.08), max(veinMask, stemMask));
        col = col * diffuse + specular;
        col = mix(fadeCol, col, distancefade);
        float alpha = (rstop > 0.001) ? (0.5 - r / (rstop * 2.0)) : 1.0;
        alpha = smoothstep(0.0, 1.0, alpha) * palpha;
        gl_FragColor = vec4(col * 0.5, alpha);
    } else {
        float glow = exp(-dot(coord, coord) * 6.0);
        if (glow < 0.03) discard;
        vec3 col = mix(vec3(0.35, 0.65, 0.15), vec3(1.0, 0.92, 0.45), glow);
        col += vec3(1.0, 0.85, 0.4) * specular * glow;
        col = mix(fadeCol, col, distancefade);
        gl_FragColor = vec4(col * 0.8, glow * palpha);
    }
}

`;
export const fx_common_vsh = `
uniform vec3 uResolution;
attribute vec2 aPosition;

varying vec2 texCoord;
varying vec2 screenCoord;

void main(void) {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    texCoord = aPosition.xy * 0.5 + vec2(0.5, 0.5);
    screenCoord = aPosition.xy * vec2(uResolution.z, 1.0);
}
`;
export const bg_fsh = `
#ifdef GL_ES
//precision mediump float;
precision highp float;
#endif

uniform vec2 uTimes;
uniform vec3 uBgDark;
uniform vec3 uBgLight;

varying vec2 texCoord;
varying vec2 screenCoord;

void main(void) {
    vec3 col;
    float c;
    vec2 tmpv = texCoord * vec2(0.8, 1.0) - vec2(0.95, 1.0);
    c = exp(-pow(length(tmpv) * 1.8, 2.0));
    col = mix(uBgDark, uBgLight * 1.5, c);
    float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col = col * 0.5 + (dither - 0.5) * (2.0 / 255.0);
    gl_FragColor = vec4(col, 1.0);
}
`;
export const fx_brightbuf_fsh = `
#ifdef GL_ES
//precision mediump float;
precision highp float;
#endif
uniform sampler2D uSrc;
uniform vec2 uDelta;

varying vec2 texCoord;
varying vec2 screenCoord;

void main(void) {
    vec4 col = texture2D(uSrc, texCoord);
    float luma = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722));
    float bloom = smoothstep(0.5, 0.72, luma);
    gl_FragColor = vec4(col.rgb * bloom, 1.0);
}
`;
export const fx_dirblur_r4_fsh = `
#ifdef GL_ES
//precision mediump float;
precision highp float;
#endif
uniform sampler2D uSrc;
uniform vec2 uDelta;
uniform vec4 uBlurDir; //dir(x, y), stride(z, w)

varying vec2 texCoord;
varying vec2 screenCoord;

void main(void) {
    vec4 col = texture2D(uSrc, texCoord);
    col = col + texture2D(uSrc, texCoord + uBlurDir.xy * uDelta);
    col = col + texture2D(uSrc, texCoord - uBlurDir.xy * uDelta);
    col = col + texture2D(uSrc, texCoord + (uBlurDir.xy + uBlurDir.zw) * uDelta);
    col = col + texture2D(uSrc, texCoord - (uBlurDir.xy + uBlurDir.zw) * uDelta);
    gl_FragColor = col / 5.0;
}
`;
export const pp_final_vsh = `
uniform vec3 uResolution;
attribute vec2 aPosition;
varying vec2 texCoord;
varying vec2 screenCoord;
void main(void) {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    texCoord = aPosition.xy * 0.5 + vec2(0.5, 0.5);
    screenCoord = aPosition.xy * vec2(uResolution.z, 1.0);
}
`;
export const pp_final_fsh = `
#ifdef GL_ES
//precision mediump float;
precision highp float;
#endif
uniform sampler2D uSrc;
uniform sampler2D uBloom;
uniform vec2 uDelta;
varying vec2 texCoord;
varying vec2 screenCoord;
void main(void) {
    vec4 srccol = texture2D(uSrc, texCoord) * 2.0;
    vec4 bloomcol = texture2D(uBloom, texCoord);
    vec4 col;
    col = srccol + bloomcol * (vec4(1.0) + srccol);
    col *= smoothstep(1.0, 0.0, pow(length((texCoord - vec2(0.5)) * 2.0), 1.2) * 0.5);
    col = pow(max(col, vec4(0.0)), vec4(0.45454545454545)); //(1.0 / 2.2)
    float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col.rgb += (dither - 0.5) * (1.0 / 255.0);
    
    gl_FragColor = vec4(col.rgb, 1.0);
    gl_FragColor.a = 1.0;
}
`;
