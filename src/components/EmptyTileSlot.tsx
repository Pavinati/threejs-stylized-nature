import { Euler, Vector3 } from "three";
import { Line } from "@react-three/drei";
import { HEX_SIZE } from "../utilities/HexCoords";

const OUTLINE_POINTS: [number, number, number][] = Array.from(
  { length: 6 + 1 },
  (_, i) => {
    const theta = (i / 6) * Math.PI * 2 + Math.PI / 6;
    return [HEX_SIZE * Math.sin(theta), 0, HEX_SIZE * Math.cos(theta)];
  },
);

interface EmptyTileSlotProps {
  position?: Vector3;
  rotation?: Euler;
}

/** Marks an unoccupied hex slot the same size as a tile, hinting where one can be added. */
export function EmptyTileSlot({ position, rotation }: EmptyTileSlotProps) {
  return (
    <group position={position} rotation={rotation} name="empty-tile-slot">
      <mesh position={[0, -0.05, 0]} rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[HEX_SIZE, HEX_SIZE, 0.02, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
      <Line
        points={OUTLINE_POINTS}
        color="#ffffff"
        lineWidth={1.5}
        dashed
        dashSize={0.2}
        gapSize={0.15}
        transparent
        opacity={0.5}
      />
    </group>
  );
}
