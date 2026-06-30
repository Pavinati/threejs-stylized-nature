// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Log } from "./resources/Log";

const LOG_COUNT = 3;
const LOG_POSITION_RANGE = 1.3;

export default function Logs(props: TileComponentProps) {
  const resources = useMemo(() => {
    const result = [];
    for (let i = 0; i < LOG_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / LOG_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * LOG_POSITION_RANGE;
      const groupX = Math.cos(theta) * r;
      const groupZ = Math.sin(theta) * r;
      const rotation = new Euler(0, Math.random() * Math.PI * 2, 0);
      const position = new Vector3(groupX, 0.15, groupZ);
      result.push(<Log position={position} rotation={rotation} />);
    }
    return result;
  }, []);

  return <Tile {...props} resources={resources} />;
}
