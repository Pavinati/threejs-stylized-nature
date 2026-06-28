// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import type { Vector3 } from "three";
import { MushroomStripe, UpperCap, LowerCap } from "../../../ThreeJSInstances";

export interface MushroomProps {
  position?: Vector3;
  scale?: number;
}

export function Mushroom({ position, scale = 1 }: MushroomProps) {
  return (
    <group position={position} scale={scale} name="mushroom">
      <MushroomStripe position={[0, 0.08, 0]} name="stripe" />
      <UpperCap position={[0, 0.16, 0]} name="cap" />
      <LowerCap
        position={[0, 0.16, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        name="cap"
      />
    </group>
  );
}
