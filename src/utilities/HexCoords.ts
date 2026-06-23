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

export interface AxialCoord {
  q: number;
  r: number;
}

export const NEIGHBOR_DIRECTIONS: AxialCoord[] = [
  { q: 1, r: 0 },
  { q: -1, r: 0 },
  { q: 0, r: 1 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
  { q: -1, r: 1 },
];

export function axialToVector3({ q, r }: AxialCoord, tileSize = 1): Vector3 {
  const x = (3 / 2) * q;
  const z = Math.sqrt(3) * (q / 2 + r);
  return new Vector3(x, 0, z).multiplyScalar(tileSize);
}
