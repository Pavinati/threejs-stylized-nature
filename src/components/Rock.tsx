import type { Euler, Vector3 } from "three";
import { Rock as RockInstance } from "../ThreeJSInstances";

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
    <RockInstance
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
    />
  );
}
