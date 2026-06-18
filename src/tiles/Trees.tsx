import { useMemo } from "react";
import { Vector3 } from "three";
import { GrassTileBase } from "../components/GrassTileBase";
import { Tree } from "../components/Tree";

const TREE_COUNT = 5;
const TREE_POSITION_RANGE = 1.5;

interface TreesProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

export default function Trees({ position = [0, 0, 0] }: TreesProps) {
  const threePositions = useMemo(() => {
    const positions: Vector3[] = [];
    for (let i = 0; i < TREE_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / TREE_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * TREE_POSITION_RANGE;
      positions.push(new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
    }
    return positions;
  }, []);

  return (
    <group position={position} name="trees">
      <GrassTileBase />
      {threePositions.map((pos, index) => (
        <Tree key={index} position={pos} />
      ))}
    </group>
  );
}
