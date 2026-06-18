import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { GrassTileBase } from "../components/GrassTileBase";
import { Bush } from "../components/Bush";

const BUSH_COUNT = 6;
const BUSH_POSITION_RANGE = 1.6;

interface BushArgs {
  position: Vector3;
  rotation: Euler;
  scale: number;
}

interface BushesProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

export default function Bushes({ position = [0, 0, 0] }: BushesProps) {
  const bushArgs = useMemo(() => {
    const args: BushArgs[] = [];
    for (let i = 0; i < BUSH_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / BUSH_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * BUSH_POSITION_RANGE;
      args.push({
        position: new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r),
        rotation: new Euler(0, Math.random() * Math.PI * 2, 0),
        scale: 0.8 + Math.random() * 0.6,
      });
    }
    return args;
  }, []);

  return (
    <group position={position} name="bushes">
      <GrassTileBase />
      {bushArgs.map(({ position, rotation, scale }, index) => (
        <Bush
          key={index}
          position={position}
          rotation={rotation}
          scale={scale}
        />
      ))}
    </group>
  );
}
