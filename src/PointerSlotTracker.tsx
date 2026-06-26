// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Plane, Raycaster, Vector3 } from "three";
import { vector3ToAxial } from "./utilities/HexCoords.ts";
import type { AxialCoord } from "./utilities/HexCoords.ts";

const GROUND_PLANE = new Plane(new Vector3(0, 1, 0), 0);

export interface PointerSlotTrackerProps {
  validSlots: AxialCoord[];
  onHoverSlot: (slot: AxialCoord | null) => void;
  onSelectSlot: (slot: AxialCoord | null) => void;
  onRemoveTile: (slot: AxialCoord | null) => void;
  /** Suspends hover/click/double-click handling, e.g. while the pointer is over a screen-space overlay. */
  disabled?: boolean;
}

/**
 * Resolves the hex slot under the pointer by intersecting the ground plane and
 * rounding to the nearest axial coordinate, so it works for any slot content
 * (a tile, an empty spot, or neither) without raycasting against meshes.
 */
export function PointerSlotTracker({
  validSlots,
  onHoverSlot,
  onSelectSlot,
  onRemoveTile,
  disabled = false,
}: PointerSlotTrackerProps) {
  const { camera, pointer, gl } = useThree();
  const raycaster = useRef(new Raycaster());
  const hoveredSlot = useRef<AxialCoord | null>(null);
  const disabledRef = useRef(disabled);

  useEffect(() => {
    disabledRef.current = disabled;
    if (disabled && hoveredSlot.current) {
      hoveredSlot.current = null;
      onHoverSlot(null);
    }
  }, [disabled, onHoverSlot]);

  useFrame(() => {
    if (disabledRef.current) return;
    raycaster.current.setFromCamera(pointer, camera);
    const hit = raycaster.current.ray.intersectPlane(
      GROUND_PLANE,
      new Vector3(),
    );
    if (!hit) {
      // pointer is not over the ground plane
      if (hoveredSlot.current) {
        hoveredSlot.current = null;
        onHoverSlot(null);
      }
      return;
    }
    const hitSlot = vector3ToAxial(hit);
    const slot = validSlots.find((s) => hitSlot.q === s.q && hitSlot.r === s.r);
    if (!slot) {
      // pointer is not over a valid slot
      if (hoveredSlot.current) {
        hoveredSlot.current = null;
        onHoverSlot(null);
      }
      return;
    }
    const prev = hoveredSlot.current;
    if (!prev || slot.q !== prev.q || slot.r !== prev.r) {
      hoveredSlot.current = slot;
      onHoverSlot(slot);
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    const handleClick = () => {
      if (disabledRef.current) return;
      onSelectSlot(hoveredSlot.current);
    };
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [gl, onSelectSlot]);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleDoubleClick = () => {
      if (disabledRef.current) return;
      onRemoveTile(hoveredSlot.current);
    };
    canvas.addEventListener("dblclick", handleDoubleClick);
    return () => canvas.removeEventListener("dblclick", handleDoubleClick);
  }, [gl, onRemoveTile]);

  return null;
}
