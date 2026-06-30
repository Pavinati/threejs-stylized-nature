// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Bush } from "./resources/Bush";

const BUSH_COUNT = 6;
const BUSH_POSITION_RANGE = 1.6;

export default function Bushes(props: TileComponentProps) {
  const resources = useMemo(() => {
    const result = [];
    for (let i = 0; i < BUSH_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / BUSH_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * BUSH_POSITION_RANGE;
      const position = new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
      const rotation = new Euler(0, Math.random() * Math.PI * 2, 0);
      const scale = 0.8 + Math.random() * 0.6;
      result.push(
        <Bush position={position} rotation={rotation} scale={scale} />,
      );
    }
    return result;
  }, []);

  return <Tile {...props} resources={resources} />;
}
