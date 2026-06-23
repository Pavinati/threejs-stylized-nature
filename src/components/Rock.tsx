import type { Euler, Vector3 } from "three";

export interface RockProps {
  name?: string;
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Rock({
  name = "rock",
  position,
  rotation,
  scale = 1,
}: RockProps) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
      name={name}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={"#8a8a8a"} />
    </mesh>
  );
}
