import type { Euler, Vector3 } from "three";

export interface LogProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Log({ position, rotation, scale = 1 }: LogProps) {
  return (
    <group position={position} rotation={rotation} scale={scale} name="log">
      <mesh
        position={[0, -0.03, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        name="trunk"
      >
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8, 1, true]} />
        <meshStandardMaterial color={"#6b4a2f"} />
      </mesh>
      <mesh
        position={[0.4, -0.03, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
        name="cut-end"
      >
        <circleGeometry args={[0.15, 8]} />
        <meshStandardMaterial color={"#d8c19a"} />
      </mesh>
      <mesh
        position={[-0.4, -0.03, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
        name="cut-end"
      >
        <circleGeometry args={[0.15, 8]} />
        <meshStandardMaterial color={"#d8c19a"} />
      </mesh>
    </group>
  );
}
