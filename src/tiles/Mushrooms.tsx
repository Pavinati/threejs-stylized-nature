import { useMemo } from "react";
import { Vector3 } from "three";
import { GrassTileBase } from "../components/GrassTileBase";
import { Mushroom } from "../components/Mushroom";

const MUSHROOM_COUNT = 8;
const MUSHROOM_POSITION_RANGE = 1.6;

interface MushroomArgs {
  position: Vector3;
  scale: number;
}

interface MushroomsProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

export default function Mushrooms({ position = [0, 0, 0] }: MushroomsProps) {
  const mushroomArgs = useMemo(() => {
    const args: MushroomArgs[] = [];
    for (let i = 0; i < MUSHROOM_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / MUSHROOM_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * MUSHROOM_POSITION_RANGE;
      args.push({
        position: new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r),
        scale: 0.3 + Math.random() * 0.8,
      });
    }
    return args;
  }, []);

  return (
    <group position={position} name="mushrooms">
      <GrassTileBase />
      {mushroomArgs.map(({ position, scale }, index) => (
        <Mushroom key={index} position={position} scale={scale} />
      ))}
    </group>
  );
}
