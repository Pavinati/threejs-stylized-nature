import { Euler } from "three";
import { EmptyTileSlot } from "./EmptyTileSlot.tsx";
import { axialToVector3 } from "../utilities/HexCoords.ts";
import { slotKey } from "../utilities/HexLayout.ts";
import type { AxialCoord } from "../utilities/HexCoords.ts";
import type { LayoutSlot } from "../utilities/HexLayout.ts";

function rotationStepToRadians(step: number): Euler {
  const yAxysRotation = step * (Math.PI / 3) + Math.PI / 6;
  return new Euler(0, yAxysRotation, 0);
}

export interface LayoutRendererProps {
  slots: LayoutSlot[];
  emptySlots: AxialCoord[];
  tileSize?: number;
  showEmptySlots?: boolean;
}

export function LayoutRenderer({
  slots,
  emptySlots,
  tileSize = 1,
}: LayoutRendererProps) {
  return (
    <>
      {slots.map(({ position, Tile, rotationStep = 0 }) => (
        <Tile
          key={slotKey(position)}
          position={axialToVector3(position, tileSize)}
          rotation={rotationStepToRadians(rotationStep)}
        />
      ))}
      {emptySlots.map((p) => (
        <EmptyTileSlot
          key={slotKey(p)}
          position={axialToVector3(p, tileSize)}
          rotation={rotationStepToRadians(0)}
        />
      ))}
    </>
  );
}
