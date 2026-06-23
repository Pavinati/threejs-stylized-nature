import type { Euler, Vector3 } from "three";
import { Stump as StumpInstance } from "../ThreeJSInstances";

export interface StumpProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Stump({ position, rotation, scale = 1 }: StumpProps) {
  return (
    <group position={position} rotation={rotation} scale={scale} name="stump">
      <StumpInstance position={[0, 0.15, 0]} name="trunk" />
    </group>
  );
}
