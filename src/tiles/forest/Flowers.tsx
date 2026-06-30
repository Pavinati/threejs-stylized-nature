// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Flower } from "./resources/Flower";

const FLOWER_COUNT = 10;
const FLOWER_POSITION_RANGE = 1.7;
const FLOWER_COLORS = ["#e85d9e", "#f2c14e", "#8e6fe0", "#f25c5c"];

export default function Flowers(props: TileComponentProps) {
  const resources = useMemo(() => {
    const result = [];
    for (let i = 0; i < FLOWER_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / FLOWER_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * FLOWER_POSITION_RANGE;
      const position = new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
      const rotation = new Euler(0, Math.random() * Math.PI * 2, 0);
      const color =
        FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];
      const scale = 0.8 + Math.random() * 0.5;
      result.push(
        <Flower
          position={position}
          rotation={rotation}
          color={color}
          scale={scale}
        />,
      );
    }
    return result;
  }, []);

  return <Tile {...props} resources={resources} />;
}
