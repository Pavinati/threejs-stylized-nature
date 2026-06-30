// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { immerable, produce } from "immer";
import type { Draft } from "immer";
import { NEIGHBOR_DIRECTIONS } from "./HexCoords.ts";
import type { AxialCoord } from "./HexCoords.ts";

const INITIAL_EMPTY_SLOT: AxialCoord = { q: 0, r: 0 };

export type Tile =
  | "Trees"
  | "Rocks"
  | "Bushes"
  | "Logs"
  | "Mushrooms"
  | "Stumps"
  | "Flowers";

function isValidTile(v: string): v is Tile {
  switch (v) {
    case "Trees":
    case "Rocks":
    case "Bushes":
    case "Logs":
    case "Mushrooms":
    case "Stumps":
    case "Flowers":
      return true;
    default:
      return false;
  }
}

export type RotationDirection = "cw" | "ccw";

export interface LayoutSlot {
  tile: Tile;
  position: AxialCoord;
  /** Multiple of 60 degrees, e.g. 1 = 60deg, 2 = 120deg. */
  rotationStep?: number;
}

// Type alias for better readability and compile-time safety
type SlotKey = string;

export interface SerializedLayoutSlot {
  tileName: string;
  position: AxialCoord;
  rotationStep?: number;
}

export function slotKey({ q, r }: AxialCoord): SlotKey {
  return `${q},${r}`;
}

export class HexLayout {
  [immerable] = true;
  _layoutSlots: Map<SlotKey, LayoutSlot>;
  _emptySlots: Map<SlotKey, AxialCoord>;

  constructor() {
    this._layoutSlots = new Map<SlotKey, LayoutSlot>();
    this._emptySlots = new Map<SlotKey, AxialCoord>();
    this._emptySlots.set(slotKey(INITIAL_EMPTY_SLOT), INITIAL_EMPTY_SLOT);
  }

  init(initialLayout: LayoutSlot[] = []) {
    return produce(this, () => {
      let updatedDraft: Draft<HexLayout> = new HexLayout();
      initialLayout.forEach(({ tile, position, rotationStep }) => {
        updatedDraft = updatedDraft.addTile(tile, position, rotationStep);
      });
      return updatedDraft;
    });
  }

  addTile(tile: Tile, position: AxialCoord, rotationStep?: number) {
    const key = slotKey(position);
    if (!this._emptySlots.has(key)) {
      throw new Error("Can only add tile to an empty slot.");
    }
    if (this._layoutSlots.has(key)) {
      throw new Error("Slot at position already occupied.");
    }

    return produce(this, (draft) => {
      const newSlot: LayoutSlot = { tile, position, rotationStep };
      draft._layoutSlots.set(key, newSlot);

      // Update empty slots: remove the new tile's position and add its neighbors
      draft._emptySlots.delete(key);
      for (const dir of NEIGHBOR_DIRECTIONS) {
        const neighbor = { q: position.q + dir.q, r: position.r + dir.r };
        const neighborKey = slotKey(neighbor);
        if (!draft._layoutSlots.has(neighborKey)) {
          draft._emptySlots.set(neighborKey, neighbor);
        }
      }
    });
  }

  removeTile(position: AxialCoord) {
    const key = slotKey(position);
    if (!this._layoutSlots.has(key)) {
      throw new Error("No tile to remove at the given position.");
    }

    return produce(this, (draft) => {
      draft._layoutSlots.delete(key);

      // Update empty slots: add the removed tile's position and remove neighbors if they are no longer adjacent to any tile
      draft._emptySlots.set(key, position);
      for (const dir of NEIGHBOR_DIRECTIONS) {
        const neighbor = { q: position.q + dir.q, r: position.r + dir.r };
        const neighborKey = slotKey(neighbor);

        if (!draft._emptySlots.has(neighborKey)) {
          continue; // Neighbor is not currently an empty slot, so skip it
        }
        // Check if the neighbor is adjacent to any other occupied slot
        if (!draft.isSlotAdjacentToOccupied(neighbor)) {
          draft._emptySlots.delete(neighborKey);
        }
      }
      // re-check removed tile to cleanup islands
      if (!draft.isSlotAdjacentToOccupied(position)) {
        draft._emptySlots.delete(key);
      }

      // When removing the last tile, restore the initial empty slot
      if (draft._layoutSlots.size === 0) {
        draft._emptySlots.set(slotKey(INITIAL_EMPTY_SLOT), INITIAL_EMPTY_SLOT);
      }
    });
  }

  slots(): LayoutSlot[] {
    return Array.from(this._layoutSlots.values());
  }

  emptySlots(): AxialCoord[] {
    return Array.from(this._emptySlots.values());
  }

  validSlots(): AxialCoord[] {
    const occupied = this.slots().map(({ position }) => position);
    const empty = this.emptySlots();
    return occupied.concat(empty);
  }

  isSlotAdjacentToOccupied(position: AxialCoord): boolean {
    for (const dir of NEIGHBOR_DIRECTIONS) {
      const adjacent = { q: position.q + dir.q, r: position.r + dir.r };
      const adjacentKey = slotKey(adjacent);
      if (this._layoutSlots.has(adjacentKey)) {
        return true;
      }
    }
    return false;
  }

  rotateTile(position: AxialCoord, direction: RotationDirection = "cw") {
    const key = slotKey(position);
    if (!this._layoutSlots.has(key)) {
      throw new Error("No tile to rotate at the given position.");
    }
    return produce(this, (draft) => {
      const slot = draft._layoutSlots.get(key)!;
      const delta = direction === "cw" ? -1 : 1;
      slot.rotationStep = ((slot.rotationStep ?? 0) + delta) % 6;
    });
  }

  isSlotOccupied(position: AxialCoord): boolean {
    return this._layoutSlots.has(slotKey(position));
  }

  isSlotEmpty(position: AxialCoord): boolean {
    return this._emptySlots.has(slotKey(position));
  }

  toJSON(): string {
    const slots = Array.from(this._layoutSlots.values());
    return JSON.stringify(slots);
  }

  static fromJSON(s: string): HexLayout {
    const slots: LayoutSlot[] = [];
    const j: unknown = JSON.parse(s);

    if (j && Array.isArray(j)) {
      j.forEach((slot: unknown) => {
        if (slot && typeof slot === "object") {
          if ("tile" in slot && "position" in slot) {
            const { tile, position } = slot;
            if (typeof tile !== "string" || !isValidTile(tile)) {
              return;
            }
            let rotationStep: number | undefined;
            if (
              "rotationStep" in slot &&
              typeof slot.rotationStep === "number"
            ) {
              rotationStep = slot.rotationStep;
            }
            if (position && typeof position === "object") {
              if ("q" in position && "r" in position) {
                const { q, r } = position;
                if (typeof q === "number" && typeof r === "number")
                  slots.push({ tile, position: { q, r }, rotationStep });
              }
            }
          }
        }
      });
    }
    return new HexLayout().init(slots);
  }
}
