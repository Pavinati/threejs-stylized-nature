import type { Euler, Vector3 } from "three";
import { Lobe } from "../ThreeJSInstances";

export interface BushProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Bush({ position, rotation, scale = 1 }: BushProps) {
  return (
    <group position={position} rotation={rotation} scale={scale} name="bush">
      <Lobe position={[-0.12, 0.1, -0.03]} scale={0.9} name="lobe" />
      <Lobe position={[0.13, 0.12, 0]} name="lobe" />
      <Lobe position={[-0.06, 0.08, 0.23]} scale={0.7} name="lobe" />
    </group>
  );
}
