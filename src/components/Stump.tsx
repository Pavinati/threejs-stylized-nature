import type { Euler, Vector3 } from "three";

export interface StumpProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Stump({ position, rotation, scale = 1 }: StumpProps) {
  return (
    <group position={position} rotation={rotation} scale={scale} name="stump">
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow name="trunk">
        <cylinderGeometry args={[0.18, 0.22, 0.3, 8]} />
        <meshStandardMaterial color={"#6b4a2f"} />
      </mesh>
    </group>
  );
}
