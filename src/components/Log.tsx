import type { Euler, Vector3 } from "three";
import { OuterLog, EndLog } from "../ThreeJSInstances";

export interface LogProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Log({ position, rotation, scale = 1 }: LogProps) {
  return (
    <group position={position} rotation={rotation} scale={scale} name="log">
      <OuterLog
        position={[0, -0.03, 0]}
        rotation={[0, 0, Math.PI / 2]}
        name="trunk"
      />
      <EndLog
        position={[0.4, -0.03, 0]}
        rotation={[0, Math.PI / 2, 0]}
        name="cut-end"
      />
      <EndLog
        position={[-0.4, -0.03, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        name="cut-end"
      />
    </group>
  );
}
