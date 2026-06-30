// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import type { Vector3 } from "three";
import { EmptyTileSlot } from "./EmptyTileSlot.tsx";
import { SlotHighlight } from "./SlotHighlight.tsx";
import { axialToVector3 } from "../utilities/HexCoords.ts";
import { slotKey } from "../utilities/HexLayout.ts";
import type { TileComponentType } from "./Tile.tsx";
import type { AxialCoord } from "../utilities/HexCoords.ts";
import type { LayoutSlot } from "../utilities/HexLayout.ts";
import type { Tile } from "../utilities/HexLayout.ts";

export type TileRegistry = Record<Tile, TileComponentType>;

export interface LayoutRendererProps {
  tileRegistry: TileRegistry;
  slots: LayoutSlot[];
  emptySlots: AxialCoord[];
  showEmptySlots?: boolean;
  hoveredSlot?: AxialCoord | null;
  selectedSlot?: AxialCoord | null;
  onSelectedTileAnimatingChange?: (animating: boolean) => void;
}

export function LayoutRenderer({
  tileRegistry,
  slots,
  emptySlots,
  hoveredSlot = null,
  selectedSlot = null,
  onSelectedTileAnimatingChange,
}: LayoutRendererProps) {
  return (
    <>
      {slots.map(({ tile, position, rotationStep = 0, seed }) => {
        const TileComponent = tileRegistry[tile];
        const key = slotKey(position);
        const isSelected =
          selectedSlot != null && slotKey(selectedSlot) === key;
        return (
          <TileComponent
            key={key}
            position={axialToVector3(position) as Vector3}
            rotationStep={rotationStep}
            seed={seed}
            onAnimatingChange={
              isSelected ? onSelectedTileAnimatingChange : undefined
            }
          />
        );
      })}
      {emptySlots.map((p) => (
        <EmptyTileSlot key={slotKey(p)} position={axialToVector3(p)} />
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
