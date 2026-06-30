// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { Uniform } from "three";
import { HEX_SIZE } from "../../utilities/HexCoords";

const VERT_COMMON = `
varying vec2 vRoadPos;
`;

const VERT_BEGIN = `
vRoadPos = vec2(position.x, position.y);
`;

// See https://iquilezles.org/articles/distfunctions/ for a list of SDF functions
const FRAG_COMMON = `
uniform float uEdges[6];
uniform float uHexSize;
varying vec2 vRoadPos;

float capsule(vec2 p, vec2 a, vec2 b, float r) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

float smoothUnion(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0);
  return min(a, b) - h * h * 0.25 / k;
}
`;

const FRAG_COLOR = `
{
  float roadWidth = 0.6;
  float apothem = uHexSize * sqrt(3.0) / 2.0;
  float smoothFactor = 0.2;

  vec2 p = vec2(vRoadPos.x, -vRoadPos.y);
  float d = 100000.0;
  for (int i = 0; i < 6; i++) {
    if (uEdges[i] > 0.5) {
      float angle = float(i) * PI / 3.0;
      // begin at the hex center
      vec2 begin = vec2(0.0);

      // end at hex edge middle point
      vec2 end = vec2(sin(angle), cos(angle)) * apothem;

      // compute road with a capsule SDF
      float roadSegment = capsule(p, begin, end, roadWidth / 2.0);

      // smooth join all road segments
      d = smoothUnion(d, roadSegment, smoothFactor);
    }
  }
  float road = 1.0 - smoothstep(-0.01, 0.0, d);
  diffuseColor.a = road;
}
`;

interface RoadMaterialProps {
  activeEdges: number[];
  seed: number;
}

export function RoadMaterial({ activeEdges, seed }: RoadMaterialProps) {
  const edgeFlags = new Float32Array(6);
  activeEdges.forEach((i) => {
    edgeFlags[i] = 1;
  });

  return (
    <meshStandardMaterial
      key={seed}
      transparent
      depthWrite={false}
      color="#c8b07a"
      customProgramCacheKey={() => "road-tile-v1"}
      onBeforeCompile={(shader) => {
        shader.uniforms.uEdges = new Uniform(edgeFlags);
        shader.uniforms.uHexSize = new Uniform(HEX_SIZE);

        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", `#include <common>${VERT_COMMON}`)
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>${VERT_BEGIN}`,
          );

        shader.fragmentShader = shader.fragmentShader
          .replace("#include <common>", `#include <common>${FRAG_COMMON}`)
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>${FRAG_COLOR}`,
          );
      }}
    />
  );
}
