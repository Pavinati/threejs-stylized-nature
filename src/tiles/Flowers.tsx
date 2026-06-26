// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { GrassTileBase } from "../components/GrassTileBase";
import { Flower } from "../components/Flower";

const FLOWER_COUNT = 10;
const FLOWER_POSITION_RANGE = 1.7;
const FLOWER_COLORS = ["#e85d9e", "#f2c14e", "#8e6fe0", "#f25c5c"];

interface FlowerArgs {
  position: Vector3;
  rotation: Euler;
  color: string;
  scale: number;
}

interface FlowersProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function Flowers({ position, rotation }: FlowersProps) {
  const flowerArgs = useMemo(() => {
    const args: FlowerArgs[] = [];
    for (let i = 0; i < FLOWER_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / FLOWER_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * FLOWER_POSITION_RANGE;
      args.push({
        position: new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r),
        rotation: new Euler(0, Math.random() * Math.PI * 2, 0),
        color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
        scale: 0.8 + Math.random() * 0.5,
      });
    }
    return args;
  }, []);

  return (
    <group position={position} rotation={rotation} name="flowers">
      <GrassTileBase />
      {flowerArgs.map(({ position, rotation, color, scale }, index) => (
        <Flower
          key={index}
          position={position}
          rotation={rotation}
          color={color}
          scale={scale}
        />
      ))}
    </group>
  );
}
