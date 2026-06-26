// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import type { Vector3 } from "three";
import { Trunk, LowLeaves, HighLeaves } from "../ThreeJSInstances";

export interface TreeProps {
  position?: Vector3;
}

export function Tree({ position }: TreeProps) {
  return (
    <group position={position} name="tree">
      <Trunk position={[0, 0.1, 0]} name="trunk" />
      <LowLeaves position={[0, 0.35, 0]} name="low-leaves" />
      <HighLeaves position={[0, 1.0, 0]} name="high-leaves" />
    </group>
  );
}
