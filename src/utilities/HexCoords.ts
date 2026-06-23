// Hexagonal grid using Axial coordinates
//             -2  __   2
//  r axys  -1  __/  \__   1    s axys
//        0  __/  \__/  \__   0
//     1  __/  \__/  \__/  \__  -1
//  2  __/  \__/  \__/  \__/  \__  -2
//    /  \__/  \__/  \__/  \__/  \
//    \__/  \__/  \__/  \__/  \__/
//       \__/  \__/  \__/  \__/
//          \__/  \__/  \__/
//             \__/  \__/
//                \__/
//     -4 -3 -2 -1  0  1  2  3  4
//                q axys
//
// r + s + q = 0
// see more at: https://www.redblobgames.com/grids/hexagons/
import { Vector3 } from "three";

export const HEX_SIZE = 2;

export interface AxialCoord {
  q: number;
  r: number;
}

interface CubeCoord {
  q: number;
  r: number;
  s: number;
}

export const NEIGHBOR_DIRECTIONS: AxialCoord[] = [
  { q: 1, r: 0 },
  { q: -1, r: 0 },
  { q: 0, r: 1 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
  { q: -1, r: 1 },
];

export function axialToVector3({ q, r }: AxialCoord): Vector3 {
  const x = (3 / 2) * q;
  const z = Math.sqrt(3) * (q / 2 + r);
  return new Vector3(x, 0, z).multiplyScalar(HEX_SIZE);
}

export function vector3ToAxial(position: Vector3): AxialCoord {
  const q = (2 * position.x) / (3 * HEX_SIZE);
  const r = position.z / (Math.sqrt(3) * HEX_SIZE) - q / 2;

  /** the quickest way to round axial coordinates is to use cube coordinates
      and then convert them back to axial */
  const s = -q - r;
  const cubeCoords = cubeRound({ q, r, s });
  return { q: cubeCoords.q, r: cubeCoords.r };
}

/** Rounds fractional cube coordinates to the nearest hex */
function cubeRound(frac: CubeCoord): CubeCoord {
  let q = Math.round(frac.q);
  let r = Math.round(frac.r);
  let s = Math.round(frac.s);

  const dq = Math.abs(q - frac.q);
  const dr = Math.abs(r - frac.r);
  const ds = Math.abs(s - frac.s);

  if (dq > dr && dq > ds) {
    q = -r - s;
  } else if (dr > ds) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
}
