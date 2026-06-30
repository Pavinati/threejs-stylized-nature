// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useCallback, useEffect, useRef, useState } from "react";
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
import { UIButton } from "./components/UIButton.tsx";
import { SaveIcon } from "./assets/icons/SaveIcon.tsx";
import { LoadIcon } from "./assets/icons/LoadIcon.tsx";
import { ResetIcon } from "./assets/icons/ResetIcon.tsx";
import { ShuffleIcon } from "./assets/icons/ShuffleIcon.tsx";
import { RotateCWIcon } from "./assets/icons/RotateCWIcon.tsx";
import { RotateCCWIcon } from "./assets/icons/RotateCCWIcon.tsx";
import Trees from "./tiles/forest/Trees.tsx";
import Rocks from "./tiles/forest/Rocks.tsx";
import Bushes from "./tiles/forest/Bushes.tsx";
import Mushrooms from "./tiles/forest/Mushrooms.tsx";
import Stumps from "./tiles/forest/Stumps.tsx";
import Logs from "./tiles/forest/Logs.tsx";
import Flowers from "./tiles/forest/Flowers.tsx";
import Road from "./tiles/forest/Road.tsx";

export const TILE_REGISTRY: TileRegistry = {
  Trees: Trees,
  Rocks: Rocks,
  Bushes: Bushes,
  Logs: Logs,
  Mushrooms: Mushrooms,
  Stumps: Stumps,
  Flowers: Flowers,
  Road: Road,
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
  const [isSelectedTileAnimating, setIsSelectedTileAnimating] = useState(false);

  useEffect(() => {
    setIsSelectedTileAnimating(false);
  }, [selectedSlot]);

  useEffect(() => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, layout.toJSON());
  }, [layout]);

  const handleRerandomize = useCallback(() => {
    if (!selectedSlot || !layout.isSlotOccupied(selectedSlot)) return;
    setLayout((l) => l.rerandomizeTile(selectedSlot));
  }, [selectedSlot, layout]);

  const handleRotateCW = useCallback(() => {
    if (!selectedSlot || !layout.isSlotOccupied(selectedSlot)) return;
    setLayout((l) => l.rotateTile(selectedSlot, "cw"));
  }, [selectedSlot, layout]);

  const handleRotateCCW = useCallback(() => {
    if (!selectedSlot || !layout.isSlotOccupied(selectedSlot)) return;
    setLayout((l) => l.rotateTile(selectedSlot, "ccw"));
  }, [selectedSlot, layout]);

  const handleReset = useCallback(() => {
    setLayout(new HexLayout());
    setSelectedSlot(null);
    setHoveredSlot(null);
  }, []);

  const handleSave = useCallback(() => {
    const json = layout.toJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "board.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [layout]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const loaded = HexLayout.fromJSON(ev.target?.result as string);
          setLayout(loaded);
          setSelectedSlot(null);
          setHoveredSlot(null);
        } catch (e) {
          // ignore invalid files
          console.log(e);
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [],
  );

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
      {(!selectedSlot || !layout.isSlotOccupied(selectedSlot)) && (
        <div className="fixed bottom-[16%] left-1/2 -translate-x-1/2 z-10 flex gap-2">
          <UIButton icon={<SaveIcon />} label="Save" onClick={handleSave} />
          <UIButton
            icon={<LoadIcon />}
            label="Load"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleLoadFile}
          />
          <UIButton
            icon={<ResetIcon />}
            label="Reset board"
            onClick={handleReset}
          />
        </div>
      )}
      {selectedSlot && layout.isSlotOccupied(selectedSlot) && (
        <div className="fixed bottom-[16%] left-1/2 -translate-x-1/2 z-10 flex gap-2">
          <UIButton
            icon={<RotateCCWIcon />}
            label="Rotate CCW"
            onClick={handleRotateCCW}
            disabled={isSelectedTileAnimating}
          />
          <UIButton
            icon={<ShuffleIcon />}
            label="Shuffle"
            onClick={handleRerandomize}
          />
          <UIButton
            icon={<RotateCWIcon />}
            label="Rotate CW"
            onClick={handleRotateCW}
            disabled={isSelectedTileAnimating}
          />
        </div>
      )}
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
            near={4}
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
            onSelectedTileAnimatingChange={setIsSelectedTileAnimating}
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
