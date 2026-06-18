import type { Euler, Vector3 } from "three";

export interface RockProps {
  name?: string;
  position?: number | Vector3 | [x: number, y: number, z: number];
  rotation?: number | Euler | [x: number, y: number, z: number];
  scale?: number;
}

export function Rock({
  name = "rock",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
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
