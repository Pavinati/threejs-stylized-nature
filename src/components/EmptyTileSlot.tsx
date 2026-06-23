import { Euler, Vector3 } from "three";
import { Line } from "@react-three/drei";

const HEX_RADIUS = 2;
const HEX_SEGMENTS = 6;

const OUTLINE_POINTS: [number, number, number][] = Array.from(
  { length: HEX_SEGMENTS + 1 },
  (_, i) => {
    const theta = (i / HEX_SEGMENTS) * Math.PI * 2 + Math.PI / 6;
    return [HEX_RADIUS * Math.sin(theta), 0, HEX_RADIUS * Math.cos(theta)];
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
        <cylinderGeometry args={[HEX_RADIUS, HEX_RADIUS, 0.02, HEX_SEGMENTS]} />
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
