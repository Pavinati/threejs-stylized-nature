// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import Prando from "prando";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Bush } from "./resources/Bush";

const BUSH_COUNT = 6;
const BUSH_POSITION_RANGE = 1.6;

export default function Bushes({ ...props }: TileComponentProps) {
  const resources = useMemo(() => {
    const rng = new Prando(props.seed);
    const result = [];
    for (let i = 0; i < BUSH_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / BUSH_COUNT;
      const theta = (i + rng.next()) * sliceAngle;
      const r = Math.sqrt(rng.next()) * BUSH_POSITION_RANGE;
      const position = new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
      const rotation = new Euler(0, rng.next() * Math.PI * 2, 0);
      const scale = 0.8 + rng.next() * 0.6;
      result.push(
        <Bush position={position} rotation={rotation} scale={scale} />,
      );
    }
    return result;
  }, [props.seed]);

  return <Tile {...props} resources={resources} />;
}
