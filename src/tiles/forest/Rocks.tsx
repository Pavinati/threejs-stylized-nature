// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import Prando from "prando";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Rock } from "./resources/Rock";

const ROCK_COUNT = 6;
const ROCK_POSITION_RANGE = 1.4;

export default function Rocks({ ...props }: TileComponentProps) {
  const resources = useMemo(() => {
    const rng = new Prando(props.seed);
    const result = [];
    for (let i = 0; i < ROCK_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / ROCK_COUNT;
      const theta = (i + rng.next()) * sliceAngle;
      const r = Math.sqrt(rng.next()) * ROCK_POSITION_RANGE;
      const groupX = Math.cos(theta) * r;
      const groupY = Math.sin(theta) * r;
      const boulderScale = 0.18 + rng.next() * 0.18;
      const boulderPosition = new Vector3(groupX, boulderScale * 0.5, groupY);
      const dTheta = rng.next() * 2.0 * Math.PI;
      const dR = 0.25 + rng.next() * 0.1;
      const dx = Math.cos(dTheta) * dR;
      const dy = Math.sin(dTheta) * dR;
      const pebblePosition = new Vector3(
        groupX + dx,
        boulderScale * 0.25,
        groupY + dy,
      );
      const rotation = new Euler(0, rng.next() * Math.PI * 2, 0);
      result.push(
        <>
          <Rock
            position={boulderPosition}
            scale={boulderScale}
            rotation={rotation}
            name="boulder"
          />
          <Rock
            position={pebblePosition}
            rotation={rotation}
            scale={boulderScale * 0.4}
            name="pebble"
          />
        </>,
      );
    }
    return result;
  }, [props.seed]);

  return <Tile {...props} resources={resources} />;
}
