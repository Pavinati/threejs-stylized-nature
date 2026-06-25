import type { ComponentType } from "react";
import { Euler } from "three";
import type { Vector3 } from "three";
import { EmptyTileSlot } from "./EmptyTileSlot.tsx";
import { SlotHighlight } from "./SlotHighlight.tsx";
import { axialToVector3 } from "../utilities/HexCoords.ts";
import { slotKey } from "../utilities/HexLayout.ts";
import type { AxialCoord } from "../utilities/HexCoords.ts";
import type { LayoutSlot } from "../utilities/HexLayout.ts";
import type { Tile } from "../utilities/HexLayout.ts";

export type Component = ComponentType<{ position?: Vector3; rotation?: Euler }>;
export type TileRegistry = Record<Tile, Component>;

function rotationStepToRadians(step: number): Euler {
  const yAxysRotation = step * (Math.PI / 3);
  return new Euler(0, yAxysRotation, 0);
}

export interface LayoutRendererProps {
  tileRegistry: TileRegistry;
  slots: LayoutSlot[];
  emptySlots: AxialCoord[];
  showEmptySlots?: boolean;
  hoveredSlot?: AxialCoord | null;
  selectedSlot?: AxialCoord | null;
}

export function LayoutRenderer({
  tileRegistry,
  slots,
  emptySlots,
  hoveredSlot = null,
  selectedSlot = null,
}: LayoutRendererProps) {
  return (
    <>
      {slots.map(({ tile, position, rotationStep = 0 }) => {
        const TileComponent = tileRegistry[tile];
        return (
          <TileComponent
            key={slotKey(position)}
            position={axialToVector3(position)}
            rotation={rotationStepToRadians(rotationStep)}
          />
        );
      })}
      {emptySlots.map((p) => (
        <EmptyTileSlot
          key={slotKey(p)}
          position={axialToVector3(p)}
          rotation={rotationStepToRadians(0)}
        />
      ))}
      {hoveredSlot &&
        (!selectedSlot || slotKey(hoveredSlot) !== slotKey(selectedSlot)) && (
          <SlotHighlight
            position={axialToVector3(hoveredSlot)}
            variant="hover"
          />
        )}
      {selectedSlot && (
        <SlotHighlight
          position={axialToVector3(selectedSlot)}
          variant="selected"
        />
      )}
    </>
  );
}
