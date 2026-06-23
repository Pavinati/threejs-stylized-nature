import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Plane, Raycaster, Vector3 } from "three";
import { vector3ToAxial } from "./utilities/HexCoords.ts";
import type { AxialCoord } from "./utilities/HexCoords.ts";

const GROUND_PLANE = new Plane(new Vector3(0, 1, 0), 0);

export interface PointerSlotTrackerProps {
  tileSize?: number;
  validSlots: AxialCoord[];
  onHoverSlot: (slot: AxialCoord | null) => void;
  onSelectSlot: (slot: AxialCoord | null) => void;
  onRemoveTile: (slot: AxialCoord | null) => void;
}

/**
 * Resolves the hex slot under the pointer by intersecting the ground plane and
 * rounding to the nearest axial coordinate, so it works for any slot content
 * (a tile, an empty spot, or neither) without raycasting against meshes.
 */
export function PointerSlotTracker({
  tileSize = 1,
  validSlots,
  onHoverSlot,
  onSelectSlot,
  onRemoveTile,
}: PointerSlotTrackerProps) {
  const { camera, pointer, gl } = useThree();
  const raycaster = useRef(new Raycaster());
  const hoveredSlot = useRef<AxialCoord | null>(null);

  useFrame(() => {
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
    const hitSlot = vector3ToAxial(hit, tileSize);
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
    const handleClick = () => onSelectSlot(hoveredSlot.current);
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [gl, onSelectSlot]);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleDoubleClick = () => onRemoveTile(hoveredSlot.current);
    canvas.addEventListener("dblclick", handleDoubleClick);
    return () => canvas.removeEventListener("dblclick", handleDoubleClick);
  }, [gl, onRemoveTile]);

  return null;
}
