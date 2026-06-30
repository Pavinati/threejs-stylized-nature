// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import Prando from "prando";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { Flower } from "./resources/Flower";

const FLOWER_COUNT = 10;
const FLOWER_POSITION_RANGE = 1.7;
const FLOWER_COLORS = ["#e85d9e", "#f2c14e", "#8e6fe0", "#f25c5c"];

export default function Flowers({ ...props }: TileComponentProps) {
  const resources = useMemo(() => {
    const rng = new Prando(props.seed);
    const result = [];
    for (let i = 0; i < FLOWER_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / FLOWER_COUNT;
      const theta = (i + rng.next()) * sliceAngle;
      const r = Math.sqrt(rng.next()) * FLOWER_POSITION_RANGE;
      const position = new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r);
      const rotation = new Euler(0, rng.next() * Math.PI * 2, 0);
      const color =
        FLOWER_COLORS[Math.floor(rng.next() * FLOWER_COLORS.length)];
      const scale = 0.8 + rng.next() * 0.5;
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
  }, [props.seed]);

  return <Tile {...props} resources={resources} />;
}
