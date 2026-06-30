// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useMemo, useState } from "react";
import { OrthographicCamera, Scene } from "three";
import type { Vector3 } from "three";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Line, useFBO } from "@react-three/drei";
import { ThreeJSInstances } from "../ThreeJSInstances.tsx";
import type { TileComponentType } from "./Tile.tsx";

const FRAME_SIZE = 2.6;

const HIGHLIGHT_STYLE = {
  hover: { color: "#7fd8ff", opacity: 0.6, lineWidth: 2 },
  selected: { color: "#ffd24a", opacity: 0.9, lineWidth: 3 },
};

export interface TileThumbnailProps {
  Tile: TileComponentType;
  size: number;
  resolution?: number;
  position: Vector3;
  visible?: boolean;
  renderOrder?: number;
  hovered?: boolean;
  selected?: boolean;
  onPointerEnter?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerLeave?: (event: ThreeEvent<MouseEvent>) => void;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
}

/** Renders a `Tile` off-screen exactly once and displays the captured snapshot on a plane. */
export function TileThumbnail({
  Tile,
  size,
  resolution = 256,
  position,
  visible = true,
  renderOrder,
  hovered = false,
  selected = false,
  onPointerEnter,
  onPointerLeave,
  onClick,
}: TileThumbnailProps) {
  const fbo = useFBO(resolution, resolution, { depthBuffer: true });
  const { gl } = useThree();
  const [captured, setCaptured] = useState(false);

  const scene = useMemo(() => {
    return new Scene();
  }, []);

  useFrame(() => {
    if (captured) {
      return;
    }

    const cam = new OrthographicCamera(
      -FRAME_SIZE,
      FRAME_SIZE,
      FRAME_SIZE,
      -FRAME_SIZE,
      0.1,
      20,
    );
    cam.position.set(2.6, 3, 2.6);
    cam.lookAt(0, 0.4, 0);
    cam.updateProjectionMatrix();
    gl.setRenderTarget(fbo);
    gl.setClearColor(0x000000, 0);
    gl.render(scene, cam);
    gl.setRenderTarget(null);
    setCaptured(true);
  });

  const half = size / 2;
  const outlinePoints: [number, number, number][] = [
    [-half, -half, 0.01],
    [half, -half, 0.01],
    [half, half, 0.01],
    [-half, half, 0.01],
    [-half, -half, 0.01],
  ];
  const highlightVariant = selected ? "selected" : hovered ? "hover" : null;

  return (
    <group
      position={position}
      visible={visible}
      renderOrder={renderOrder}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={fbo.texture}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
      {highlightVariant && (
        <Line
          points={outlinePoints}
          color={HIGHLIGHT_STYLE[highlightVariant].color}
          lineWidth={HIGHLIGHT_STYLE[highlightVariant].lineWidth}
          transparent
          opacity={HIGHLIGHT_STYLE[highlightVariant].opacity}
          depthTest={false}
        />
      )}
      {!captured &&
        createPortal(
          <ThreeJSInstances>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2.6, 4, 2.6]} intensity={1} />
            <Tile animate={false} />
          </ThreeJSInstances>,
          scene,
        )}
    </group>
  );
}
