// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import { Euler, Vector3 } from "three";
import { GrassTileBase } from "./GrassTileBase";
import { Log } from "./resources/Log";

const LOG_COUNT = 3;
const LOG_POSITION_RANGE = 1.3;

interface LogArgs {
  position: Vector3;
  rotation: Euler;
}

interface LogsProps {
  position?: Vector3;
  rotation?: Euler;
}

export default function Logs({ position, rotation }: LogsProps) {
  const logArgs = useMemo(() => {
    const args: LogArgs[] = [];
    for (let i = 0; i < LOG_COUNT; i++) {
      const sliceAngle = (2 * Math.PI) / LOG_COUNT;
      const theta = (i + Math.random()) * sliceAngle;
      const r = Math.sqrt(Math.random()) * LOG_POSITION_RANGE;
      const rotation = new Euler(0, Math.random() * Math.PI * 2, 0);
      const groupX = Math.cos(theta) * r;
      const groupZ = Math.sin(theta) * r;
      args.push({
        position: new Vector3(groupX, 0.15, groupZ),
        rotation,
      });
    }
    return args;
  }, []);

  return (
    <group position={position} rotation={rotation} name="logs">
      <GrassTileBase />
      {logArgs.map(({ position, rotation }, index) => (
        <Log key={index} position={position} rotation={rotation} />
      ))}
    </group>
  );
}
