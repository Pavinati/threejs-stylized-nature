import { useMemo } from "react";
import { Vector3 } from "three";

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
      <TileBase />
      {threePositions.map((pos, index) => (
        <Tree key={index} position={pos} />
      ))}
    </group>
  );
}

interface TreeProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

function Tree({ position = [0, 0, 0] }: TreeProps) {
  return (
    <group position={position} name="tree">
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow name="trunk">
        <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow name="low-leaves">
        <cylinderGeometry args={[0.2, 0.35, 0.3, 8]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow name="high-leaves">
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </group>
  );
}

interface TileBaseProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

function TileBase({ position = [0, 0, 0] }: TileBaseProps) {
  return (
    <group position={position} name="tile-base">
      <mesh position={[0, -0.05, 0]} receiveShadow name="grass">
        <cylinderGeometry args={[2, 2, 0.1, 6]} />
        <meshStandardMaterial color={"#85e385"} />
      </mesh>
      <mesh position={[0, -0.15, 0]} name="soil">
        <cylinderGeometry args={[2, 2, 0.1, 6]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
    </group>
  );
}
