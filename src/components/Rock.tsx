// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import type { Euler, Vector3 } from "three";
import { Rock as RockInstance } from "../ThreeJSInstances";

export interface RockProps {
  name?: string;
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export function Rock({
  name = "rock",
  position,
  rotation,
  scale = 1,
}: RockProps) {
  return (
    <RockInstance
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
    />
  );
}
