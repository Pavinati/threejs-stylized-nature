import type { Euler, Vector3 } from "three";

export interface BushProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Bush({ position, rotation, scale = 1 }: BushProps) {
  return (
    <group position={position} rotation={rotation} scale={scale} name="bush">
      <mesh position={[-0.12, 0.1, -0.03]} castShadow receiveShadow name="lobe">
        <icosahedronGeometry args={[0.21, 0]} />
        <meshStandardMaterial color={"#5fb85f"} />
      </mesh>
      <mesh position={[0.13, 0.12, 0]} castShadow receiveShadow name="lobe">
        <icosahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color={"#4fa84f"} />
      </mesh>
      <mesh position={[-0.06, 0.08, 0.23]} castShadow receiveShadow name="lobe">
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color={"#4fa84f"} />
      </mesh>
    </group>
  );
}
