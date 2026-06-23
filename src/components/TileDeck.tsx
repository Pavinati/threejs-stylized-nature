import { useState } from "react";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { Hud, OrthographicCamera } from "@react-three/drei";
import { TileThumbnail } from "./TileThumbnail.tsx";
import type { Component } from "../utilities/HexLayout.ts";

export interface TileDeckProps {
  tiles: Component[];
  selectedTileIndex: number | null;
  onTileSelect?: (index: number | null) => void;
  onHoverChange?: (hovered: boolean) => void;
}

export function TileDeck({
  tiles,
  selectedTileIndex,
  onTileSelect,
  onHoverChange,
}: TileDeckProps) {
  const { size } = useThree();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleTileSelect = (index: number | null) => {
    if (!index) {
      console.log(index);
      console.log(selectedTileIndex);
    }
    if (selectedTileIndex !== index) {
      onTileSelect?.(index);
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
        {tiles.map((Tile, index) => {
          const itemX = index * (previewSize + 10) + pad - hw;
          const position = new Vector3(itemX, 0, 0.1); // Slightly raised to stop propagation
          return (
            <TileThumbnail
              key={index}
              Tile={Tile}
              size={previewSize}
              position={position}
              hovered={hoveredIndex === index}
              selected={selectedTileIndex === index}
              onPointerEnter={() => setHoveredIndex(index)}
              onPointerLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleTileSelect(index);
              }}
            />
          );
        })}
      </group>
    </Hud>
  );
}
