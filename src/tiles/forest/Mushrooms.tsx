// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Vector3 } from "three";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Mushroom } from "./resources/Mushroom";

const MUSHROOM_COUNT = 8;
const MUSHROOM_POSITION_RANGE = 1.6;

export default function Mushrooms(props: TileComponentProps) {
  const resources = useMemo(() => {
    const result = [];
    for (let i = 0; i < MUSHROOM_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / MUSHROOM_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * MUSHROOM_POSITION_RANGE;
      const position = new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
      const scale = 0.3 + Math.random() * 0.8;
      result.push(<Mushroom position={position} scale={scale} />);
    }
    return result;
  }, []);

  return <Tile {...props} resources={resources} />;
}
