import { Fragment, useMemo } from "react";
import { Vector3 } from "three";
import { GrassTileBase } from "../components/GrassTileBase";
import { Rock } from "../components/Rock";

const ROCK_COUNT = 6;
const ROCK_POSITION_RANGE = 1.4;

interface RockArgs {
  boulderPosition: Vector3;
  boulderScale: number;
  pebblePosition: Vector3;
  pebbleScale: number;
  rotation: number;
}

interface RocksProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
}

export default function Rocks({ position = [0, 0, 0] }: RocksProps) {
  const rockArgs = useMemo(() => {
    const randomizedArgs: RockArgs[] = [];
    for (let i = 0; i < ROCK_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / ROCK_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * ROCK_POSITION_RANGE;
      const groupX = Math.cos(theta) * r;
      const groupY = Math.sin(theta) * r;
      const boulderScale = 0.18 + Math.random() * 0.18;
      const boulderPosition = new Vector3(groupX, boulderScale * 0.5, groupY);
      const dTheta = Math.random() * 2.0 * Math.PI;
      const dR = 0.25 + Math.random() * 0.1;
      const dx = Math.cos(dTheta) * dR;
      const dy = Math.sin(dTheta) * dR;
      const pebblePosition = new Vector3(
        groupX + dx,
        boulderScale * 0.25,
        groupY + dy,
      );

      randomizedArgs.push({
        boulderPosition,
        boulderScale,
        pebblePosition,
        pebbleScale: boulderScale * 0.4,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    return randomizedArgs;
  }, []);

  return (
    <group position={position} name="rocks">
      <GrassTileBase />
      {rockArgs.map(
        (
          {
            boulderScale,
            boulderPosition,
            pebblePosition,
            pebbleScale,
            rotation,
          },
          index,
        ) => (
          <Fragment key={index}>
            <Rock
              position={boulderPosition}
              scale={boulderScale}
              rotation={[0, rotation, 0]}
              name="boulder"
            />
            <Rock
              position={pebblePosition}
              rotation={[0, rotation, 0]}
              scale={pebbleScale}
              name="pebble"
            />
          </Fragment>
        ),
      )}
    </group>
  );
}
