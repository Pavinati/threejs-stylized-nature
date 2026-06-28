// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useCallback, useEffect, useState } from "react";
import { CameraHelper, PCFShadowMap } from "three";
import { Canvas } from "@react-three/fiber";
import { Helper, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useControls } from "leva";
import { ThreeJSInstances } from "./ThreeJSInstances.tsx";
import { HexLayout } from "./utilities/HexLayout.ts";
import type { Tile } from "./utilities/HexLayout.ts";
import type { AxialCoord } from "./utilities/HexCoords.ts";
import { PointerSlotTracker } from "./PointerSlotTracker.tsx";
import { LayoutRenderer } from "./components/LayoutRenderer.tsx";
import type { TileRegistry } from "./components/LayoutRenderer.tsx";
import { TileDeck } from "./components/TileDeck.tsx";
import { Tutorial } from "./components/Tutorial.tsx";
import Trees from "./tiles/Trees.tsx";
import Rocks from "./tiles/Rocks.tsx";
import Bushes from "./tiles/Bushes.tsx";
import Mushrooms from "./tiles/Mushrooms.tsx";
import Stumps from "./tiles/Stumps.tsx";
import Logs from "./tiles/Logs.tsx";
import Flowers from "./tiles/Flowers.tsx";

export const TILE_REGISTRY: TileRegistry = {
  Trees: Trees,
  Rocks: Rocks,
  Bushes: Bushes,
  Logs: Logs,
  Mushrooms: Mushrooms,
  Stumps: Stumps,
  Flowers: Flowers,
};

const LAYOUT_STORAGE_KEY = "stylized-nature.layout";

function loadLayout(): HexLayout {
  const saved = localStorage.getItem(LAYOUT_STORAGE_KEY);
  if (!saved) {
    return new HexLayout();
  }
  try {
    return HexLayout.fromJSON(saved);
  } catch {
    return new HexLayout();
  }
}

function App() {
  const [layout, setLayout] = useState(loadLayout);
  const [hoveredSlot, setHoveredSlot] = useState<AxialCoord | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AxialCoord | null>(null);
  const [isDeckHovered, setIsDeckHovered] = useState(false);
  const [selectedTile, setSelectedTile] = useState<Tile | null>("Trees");
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, layout.toJSON());
  }, [layout]);

  const handleDoubleClick = useCallback(
    (slot: AxialCoord | null) => {
      if (!slot) {
        return;
      }
      if (layout.isSlotOccupied(slot)) {
        setHoveredSlot(null);
        setSelectedSlot(null);
        setLayout((l) => l.removeTile(slot));
      } else if (selectedTile !== null) {
        setLayout((l) => l.addTile(selectedTile, slot));
      }
    },
    [layout, selectedTile],
  );

  // Debug
  const { near, far, zoom } = useControls("Camera", {
    near: {
      value: 0.1,
      step: 0.1,
      min: 0.1,
      max: 10,
    },
    far: {
      value: 100,
      step: 0.1,
      min: 1,
      max: 500,
    },
    zoom: {
      value: 100,
      step: 0.1,
      min: 0.1,
      max: 1000,
    },
  });
  const { showLightHelper, bias, cameraHSize } = useControls("Shadows", {
    showLightHelper: {
      value: false,
      name: "Show Light Helper",
    },
    bias: {
      name: "Bias",
      pad: 4,
      value: 0.003,
      step: 0.0001,
      min: 0,
      max: 0.01,
    },
    cameraHSize: {
      name: "Camera half size",
      value: 12,
      step: 0.1,
      min: 5,
      max: 20,
    },
  });

  return (
    <>
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      <Canvas
        className="fixed w-screen"
        shadows={{ enabled: true, type: PCFShadowMap }}
      >
        <color attach="background" args={["#808080"]} />
        <OrthographicCamera
          makeDefault
          position={[0, 30, 30]}
          near={near}
          far={far}
          zoom={zoom}
        />
        <OrbitControls maxPolarAngle={Math.PI / 2} enabled={!isDeckHovered} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[2.3, 8.15, 3.6]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={bias}
        >
          <orthographicCamera
            attach="shadow-camera"
            near={3}
            far={13}
            left={-cameraHSize}
            right={cameraHSize}
            top={cameraHSize}
            bottom={-cameraHSize}
          >
            {showLightHelper && <Helper type={CameraHelper} />}
          </orthographicCamera>
        </directionalLight>
        <ThreeJSInstances>
          <LayoutRenderer
            tileRegistry={TILE_REGISTRY}
            slots={layout.slots()}
            emptySlots={layout.emptySlots()}
            showEmptySlots
            hoveredSlot={hoveredSlot}
            selectedSlot={selectedSlot}
          />
          <TileDeck
            tileRegistry={TILE_REGISTRY}
            onHoverChange={setIsDeckHovered}
            selectedTile={selectedTile}
            onTileSelect={setSelectedTile}
          />
        </ThreeJSInstances>
        <PointerSlotTracker
          validSlots={layout.validSlots()}
          onHoverSlot={setHoveredSlot}
          onSelectSlot={setSelectedSlot}
          onRemoveTile={handleDoubleClick}
          disabled={isDeckHovered}
        />
      </Canvas>
    </>
  );
}

export default App;
