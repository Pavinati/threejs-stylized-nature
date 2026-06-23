import type { ComponentType } from "react";
import type { Euler, Vector3 } from "three";
import { immerable, produce } from "immer";
import type { Draft } from "immer";
import { NEIGHBOR_DIRECTIONS } from "./HexCoords.ts";
import type { AxialCoord } from "./HexCoords.ts";

const INITIAL_EMPTY_SLOT: AxialCoord = { q: 0, r: 0 };

type Component = ComponentType<{ position?: Vector3; rotation?: Euler }>;

export interface LayoutSlot {
  Tile: Component;
  position: AxialCoord;
  /** Multiple of 60 degrees, e.g. 1 = 60deg, 2 = 120deg. */
  rotationStep?: number;
}

// Type alias for better readability and compile-time safety
type SlotKey = string;

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
      initialLayout.forEach(({ position, Tile, rotationStep }) => {
        updatedDraft = updatedDraft.addTile(Tile, position, rotationStep);
      });
      return updatedDraft;
    });
  }

  addTile(Tile: Component, position: AxialCoord, rotationStep?: number) {
    const key = slotKey(position);
    if (!this._emptySlots.has(key)) {
      throw new Error("Can only add tile to an empty slot.");
    }
    if (this._layoutSlots.has(key)) {
      throw new Error("Slot at position already occupied.");
    }

    return produce(this, (draft) => {
      const newSlot: LayoutSlot = { Tile, position, rotationStep };
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
        this._emptySlots.set(slotKey(INITIAL_EMPTY_SLOT), INITIAL_EMPTY_SLOT);
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

  isSlotOccupied(position: AxialCoord): boolean {
    return this._layoutSlots.has(slotKey(position));
  }

  isSlotEmpty(position: AxialCoord): boolean {
    return this._emptySlots.has(slotKey(position));
  }
}
