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
import { EmptyTileSlot } from "./components/EmptyTileSlot.tsx";

export interface AxialCoord {
  q: number;
  r: number;
}

const NEIGHBOR_DIRECTIONS: AxialCoord[] = [
  { q: 1, r: 0 },
  { q: -1, r: 0 },
  { q: 0, r: 1 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
  { q: -1, r: 1 },
];

/** Unoccupied hexes adjacent to at least one occupied cell, where a new tile could go. */
export function getEmptySlots(cells: AxialCoord[]): AxialCoord[] {
  const occupied = new Set(cells.map(({ q, r }) => `${q},${r}`));
  const empty = new Map<string, AxialCoord>();
  for (const cell of cells) {
    for (const dir of NEIGHBOR_DIRECTIONS) {
      const neighbor = { q: cell.q + dir.q, r: cell.r + dir.r };
      const key = `${neighbor.q},${neighbor.r}`;
      if (!occupied.has(key)) {
        empty.set(key, neighbor);
      }
    }
  }
  return Array.from(empty.values());
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
  showEmptySlots?: boolean;
}

export function HexGrid({
  cells,
  tileSize = 1,
  showEmptySlots = false,
}: HexGridProps) {
  return (
    <>
      {cells.map(({ q, r, Tile, rotationStep = 0 }, index) => (
        <Tile
          key={index}
          position={axialToPosition({ q, r }).multiplyScalar(tileSize)}
          rotation={rotationStepToRadians(rotationStep)}
        />
      ))}
      {showEmptySlots &&
        getEmptySlots(cells).map(({ q, r }) => (
          <EmptyTileSlot
            key={`${q},${r}`}
            position={axialToPosition({ q, r }).multiplyScalar(tileSize)}
            rotation={rotationStepToRadians(0)}
          />
        ))}
    </>
  );
}
