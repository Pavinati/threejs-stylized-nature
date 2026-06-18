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
import type { ComponentType } from "react";
import { Euler, Vector3 } from "three";

export interface AxialCoord {
  q: number;
  r: number;
}

export function axialToPosition({ q, r }: AxialCoord): Vector3 {
  const x = (3 / 2) * q;
  const z = Math.sqrt(3) * (q / 2 + r);
  return new Vector3(x, 0, z);
}

export function rotationStepToRadians(step: number): Euler {
  const yAxysRotation = step * (Math.PI / 3) + Math.PI / 6; // Rotate by 30 degrees to align with the hex grid
  return new Euler(0, yAxysRotation, 0);
}

export interface HexGridCell extends AxialCoord {
  Tile: ComponentType<{ position?: Vector3; rotation?: Euler }>;
  /** Multiple of 60 degrees, e.g. 1 = 60deg, 2 = 120deg. */
  rotationStep?: number;
}

export interface HexGridProps {
  cells: HexGridCell[];
  tileSize?: number;
}

export function HexGrid({ cells, tileSize = 1 }: HexGridProps) {
  return (
    <>
      {cells.map(({ q, r, Tile, rotationStep = 0 }, index) => (
        <Tile
          key={index}
          position={axialToPosition({ q, r }).multiplyScalar(tileSize)}
          rotation={rotationStepToRadians(rotationStep)}
        />
      ))}
    </>
  );
}
