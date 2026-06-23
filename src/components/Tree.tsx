import type { Vector3 } from "three";

export interface TreeProps {
  position?: Vector3;
}

export function Tree({ position }: TreeProps) {
  return (
    <group position={position} name="tree">
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow name="trunk">
        <cylinderGeometry args={[0.15, 0.15, 0.2, 8, 1, true]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow name="low-leaves">
        <cylinderGeometry args={[0.2, 0.35, 0.3, 8]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow name="high-leaves">
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </group>
  );
}
