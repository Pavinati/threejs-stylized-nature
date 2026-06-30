// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo } from "react";
import Prando from "prando";
import { Tile } from "../../components/Tile";
import type { TileComponentProps } from "../../components/Tile";
import { HEX_SIZE } from "../../utilities/HexCoords";
import { RoadMaterial } from "./RoadMaterial";

export default function Road({ ...props }: TileComponentProps) {
  const resources = useMemo(() => {
    const rng = new Prando(props.seed);
    const activeEdges = [0];
    for (let i = 1; i < 6; i++) {
      if (rng.next() > 0.75) activeEdges.push(i);
    }

    return [
      <mesh
        key="road"
        position={[0, 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[HEX_SIZE, 6, -Math.PI / 3]} />
        <RoadMaterial activeEdges={activeEdges} seed={props.seed} />
      </mesh>,
    ];
  }, [props.seed]);

  return <Tile {...props} resources={resources} />;
}
