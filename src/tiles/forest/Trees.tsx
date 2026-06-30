// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Vector3 } from "three";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Tree } from "./resources/Tree";

const TREE_COUNT = 5;
const TREE_POSITION_RANGE = 1.5;

export default function Trees(props: TileComponentProps) {
  const resources = useMemo(() => {
    const result = [];
    for (let i = 0; i < TREE_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / TREE_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * TREE_POSITION_RANGE;
      const pos = new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
      result.push(<Tree position={pos} />);
    }
    return result;
  }, []);

  return <Tile {...props} resources={resources} />;
}
