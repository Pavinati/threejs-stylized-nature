import { useMemo } from "react";
import { Vector3 } from "three";
import { GrassTileBase } from "../components/GrassTileBase";
import { Log } from "../components/Log";

const LOG_COUNT = 3;
const LOG_POSITION_RANGE = 1.3;

interface LogArgs {
  position: Vector3;
  rotation: number;
}

interface LogsProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

export default function Logs({ position = [0, 0, 0] }: LogsProps) {
  const logArgs = useMemo(() => {
    const args: LogArgs[] = [];
    for (let i = 0; i < LOG_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / LOG_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * LOG_POSITION_RANGE;
      const rotation = Math.random() * Math.PI * 2;
      const groupX = Math.cos(theta) * r;
      const groupZ = Math.sin(theta) * r;
      args.push({
        position: new Vector3(groupX, 0.15, groupZ),
        rotation,
      });
    }
    return args;
  }, []);

  return (
    <group position={position} name="logs">
      <GrassTileBase />
      {logArgs.map(({ position, rotation }, index) => (
        <Log key={index} position={position} rotation={[0, rotation, 0]} />
      ))}
    </group>
  );
}
