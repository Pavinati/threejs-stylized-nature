// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { GrassTileBase } from "./GrassTileBase";
import { Stump } from "./resources/Stump";

const STUMP_COUNT = 4;
const STUMP_POSITION_RANGE = 1.5;

interface StumpArgs {
  position: Vector3;
  rotation: Euler;
  scale: number;
}

interface StumpsProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function Stumps({ position, rotation }: StumpsProps) {
  const stumpArgs = useMemo(() => {
    const args: StumpArgs[] = [];
    for (let i = 0; i < STUMP_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / STUMP_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * STUMP_POSITION_RANGE;
      args.push({
        position: new Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r),
        rotation: new Euler(0, Math.random() * Math.PI * 2, 0),
        scale: 0.6 + Math.random() * 0.4,
      });
    }
    return args;
  }, []);

  return (
    <group position={position} rotation={rotation} name="stumps">
      <GrassTileBase />
      {stumpArgs.map(({ position, rotation, scale }, index) => (
        <Stump
          key={index}
          position={position}
          rotation={rotation}
          scale={scale}
        />
      ))}
    </group>
  );
}
