// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Stump } from "./resources/Stump";

const STUMP_COUNT = 4;
const STUMP_POSITION_RANGE = 1.5;

export default function Stumps(props: TileComponentProps) {
  const resources = useMemo(() => {
    const result = [];
    for (let i = 0; i < STUMP_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / STUMP_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * STUMP_POSITION_RANGE;
      const position = new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
      const rotation = new Euler(0, Math.random() * Math.PI * 2, 0);
      const scale = 0.6 + Math.random() * 0.4;
      result.push(
        <Stump position={position} rotation={rotation} scale={scale} />,
      );
    }
    return result;
  }, []);

  return <Tile {...props} resources={resources} />;
}
