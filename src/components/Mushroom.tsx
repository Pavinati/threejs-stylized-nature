import type { Vector3 } from "three";

export interface MushroomProps {
  position?: Vector3;
  scale?: number;
}

export function Mushroom({ position, scale = 1 }: MushroomProps) {
  return (
    <group position={position} scale={scale} name="mushroom">
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow name="stem">
        <cylinderGeometry args={[0.04, 0.05, 0.16, 8, 1, true]} />
        <meshStandardMaterial color={"#f1e6d2"} />
      </mesh>
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow name="cap">
        <sphereGeometry args={[0.12, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={"#c43d3d"} />
      </mesh>
      <mesh
        position={[0, 0.16, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        name="cap"
      >
        <circleGeometry args={[0.12, 8]} />
        <meshStandardMaterial color={"#c43d3d"} />
      </mesh>
    </group>
  );
}
