// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { GrassHexagon, SoilHexagon } from "../ThreeJSInstances";

export function GrassTileBase() {
  return (
    <group rotation={[0, Math.PI / 6, 0]} name="grass-tile-base">
      <GrassHexagon position={[0, -0.05, 0]} name="grass" />
      <SoilHexagon position={[0, -0.15, 0]} name="soil" />
    </group>
  );
}
