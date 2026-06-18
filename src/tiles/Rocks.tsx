import { useMemo } from "react";
import { Vector3 } from "three";

const ROCK_COUNT = 6;
const ROCK_POSITION_RANGE = 1.6;

interface RocksProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

export default function Rocks({ position = [0, 0, 0] }: RocksProps) {
  const rockPositions = useMemo(() => {
    const positions: Vector3[] = [];
    for (let i = 0; i < ROCK_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / ROCK_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * ROCK_POSITION_RANGE;
      positions.push(new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
    }
    return positions;
  }, []);

  return (
    <group position={position} name="rocks">
      <TileBase />
      {rockPositions.map((pos, index) => (
        <Rock key={index} position={pos} />
      ))}
    </group>
  );
}

interface RockProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

function Rock({ position = [0, 0, 0] }: RockProps) {
  const { boulderScale, pebbleOffset, rotationY } = useMemo(
    () => ({
      boulderScale: 0.18 + Math.random() * 0.18,
      pebbleOffset: new Vector3(
        0.2 + Math.random() * 0.1,
        0,
        0.15 + Math.random() * 0.1,
      ),
      rotationY: Math.random() * Math.PI * 2,
    }),
    [],
  );

  return (
    <group position={position} rotation={[0, rotationY, 0]} name="rock">
      <mesh
        position={[0, boulderScale * 0.5, 0]}
        scale={boulderScale}
        castShadow
        receiveShadow
        name="boulder"
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={"#8a8a8a"} />
      </mesh>
      <mesh
        position={[pebbleOffset.x, boulderScale * 0.25, pebbleOffset.z]}
        scale={boulderScale * 0.4}
        castShadow
        receiveShadow
        name="pebble"
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={"#9a9a9a"} />
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
