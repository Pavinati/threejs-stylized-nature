// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useState } from "react";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { Hud, OrthographicCamera } from "@react-three/drei";
import { TileThumbnail } from "./TileThumbnail.tsx";
import type { Tile } from "../utilities/HexLayout.ts";
import type { Component, TileRegistry } from "./LayoutRenderer.tsx";

export interface TileDeckProps {
  tileRegistry: TileRegistry;
  selectedTile: Tile | null;
  onTileSelect?: (tile: Tile | null) => void;
  onHoverChange?: (hovered: boolean) => void;
}

export function TileDeck({
  tileRegistry,
  selectedTile,
  onTileSelect,
  onHoverChange,
}: TileDeckProps) {
  const { size } = useThree();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleTileSelect = (tile: Tile | null) => {
    if (selectedTile !== tile) {
      onTileSelect?.(tile);
    }
  };

  const hw = size.width / 2;
  const hh = size.height / 2;

  const deckWidth = size.width;
  const deckHeight = size.height * 0.15;
  const pad = size.width * 0.05;

  const previewSize = deckHeight * 0.9;

  return (
    <Hud renderPriority={1}>
      <OrthographicCamera
        makeDefault
        left={-hw}
        right={hw}
        top={hh}
        bottom={-hh}
        near={2}
        far={10}
        position={[0, 0, 5]}
      />
      <group
        position={[0, deckHeight / 2 - hh, 0]}
        onPointerEnter={() => onHoverChange?.(true)}
        onPointerLeave={() => onHoverChange?.(false)}
      >
        <mesh name="deck-background" onClick={() => handleTileSelect(null)}>
          <planeGeometry args={[deckWidth, deckHeight]} />
          <meshBasicMaterial
            color="#1a1a1a"
            transparent
            opacity={0.55}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>
        {Object.entries(tileRegistry).map(([tile, TileComponent], index) => {
          const itemX = index * (previewSize + 10) + pad - hw;
          const position = new Vector3(itemX, 0, 0.1); // Slightly raised to stop propagation
          return (
            <TileThumbnail
              key={index}
              Tile={TileComponent}
              size={previewSize}
              position={position}
              hovered={hoveredIndex === index}
              selected={selectedTile === tile}
              onPointerEnter={() => setHoveredIndex(index)}
              onPointerLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleTileSelect(tile as Tile);
              }}
            />
          );
        })}
      </group>
    </Hud>
  );
}
