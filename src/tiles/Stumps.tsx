import { useMemo } from "react";
import { Vector3 } from "three";
import { GrassTileBase } from "../components/GrassTileBase";
import { Stump } from "../components/Stump";

const STUMP_COUNT = 4;
const STUMP_POSITION_RANGE = 1.5;

interface StumpArgs {
  position: Vector3;
  rotation: number;
  scale: number;
}

interface StumpsProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

export default function Stumps({ position = [0, 0, 0] }: StumpsProps) {
  const stumpArgs = useMemo(() => {
    const args: StumpArgs[] = [];
    for (let i = 0; i < STUMP_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / STUMP_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * STUMP_POSITION_RANGE;
      args.push({
        position: new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r),
        rotation: Math.random() * Math.PI * 2,
        scale: 0.6 + Math.random() * 0.4,
      });
    }
    return args;
  }, []);

  return (
    <group position={position} name="stumps">
      <GrassTileBase />
      {stumpArgs.map(({ position, rotation, scale }, index) => (
        <Stump
          key={index}
          position={position}
          rotation={[0, rotation, 0]}
          scale={scale}
        />
      ))}
    </group>
  );
}
