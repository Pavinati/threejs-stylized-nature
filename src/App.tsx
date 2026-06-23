import { useCallback, useEffect, useState } from "react";
import { CameraHelper, PCFShadowMap } from "three";
import { Canvas } from "@react-three/fiber";
import { Helper, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useControls } from "leva";
import { ThreeJSInstances } from "./ThreeJSInstances.tsx";
import { HexLayout } from "./utilities/HexLayout.ts";
import type { AxialCoord } from "./utilities/HexCoords.ts";
import type { LayoutSlot } from "./utilities/HexLayout.ts";
import { PointerSlotTracker } from "./PointerSlotTracker.tsx";
import { LayoutRenderer } from "./components/LayoutRenderer.tsx";
import { TileDeck } from "./components/TileDeck.tsx";
import Trees from "./tiles/Trees.tsx";
import Rocks from "./tiles/Rocks.tsx";
import Bushes from "./tiles/Bushes.tsx";
import Mushrooms from "./tiles/Mushrooms.tsx";
import Stumps from "./tiles/Stumps.tsx";
import Logs from "./tiles/Logs.tsx";
import Flowers from "./tiles/Flowers.tsx";

const INITIAL_LAYOUT: LayoutSlot[] = [
  { position: { q: 0, r: 0 }, Tile: Trees },
  { position: { q: 1, r: 0 }, Tile: Rocks },
  { position: { q: 0, r: 1 }, Tile: Bushes },
  { position: { q: 1, r: -1 }, Tile: Logs },
  { position: { q: 0, r: -1 }, Tile: Mushrooms },
  { position: { q: -1, r: 0 }, Tile: Stumps },
  { position: { q: -1, r: 1 }, Tile: Flowers },
];

const AVAILABLE_TILES = [
  Trees,
  Rocks,
  Bushes,
  Logs,
  Mushrooms,
  Stumps,
  Flowers,
];

function App() {
  const [layout, setLayout] = useState(new HexLayout());
  const [hoveredSlot, setHoveredSlot] = useState<AxialCoord | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AxialCoord | null>(null);

  useEffect(() => {
    setLayout((l) => l.init(INITIAL_LAYOUT));
  }, []);

  const handleDoubleClick = useCallback(
    (slot: AxialCoord | null) => {
      if (!slot) {
        return;
      }
      if (layout.isSlotOccupied(slot)) {
        setHoveredSlot(null);
        setSelectedSlot(null);
        setLayout((l) => l.removeTile(slot));
      } else {
        const randIdx = Math.floor(Math.random() * AVAILABLE_TILES.length);
        const randomTile = AVAILABLE_TILES[randIdx];
        setLayout((l) => l.addTile(randomTile, slot));
      }
    },
    [layout],
  );

  // Debug
  const { showLightHelper, shadowBias } = useControls({
    showLightHelper: {
      value: false,
      name: "Show Light Helper",
    },
    shadowBias: {
      name: "Shadow Bias",
      pad: 4,
      value: 0.003,
      step: 0.0001,
      min: 0,
      max: 0.01,
    },
  });

  return (
    <Canvas
      className="fixed w-screen"
      shadows={{ enabled: true, type: PCFShadowMap }}
    >
      <color attach="background" args={["#808080"]} />
      <OrthographicCamera makeDefault position={[0, 5, 5]} zoom={100} />
      <OrbitControls maxPolarAngle={Math.PI / 2} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[2.3, 8.15, 3.6]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={shadowBias}
      >
        <orthographicCamera
          attach="shadow-camera"
          near={3}
          far={13}
          left={-5}
          right={5}
          top={5}
          bottom={-5}
        >
          {showLightHelper && <Helper type={CameraHelper} />}
        </orthographicCamera>
      </directionalLight>
      <LayoutRenderer
        slots={layout.slots()}
        emptySlots={layout.emptySlots()}
        showEmptySlots
        hoveredSlot={hoveredSlot}
        selectedSlot={selectedSlot}
      />
      <PointerSlotTracker
        validSlots={layout.validSlots()}
        onHoverSlot={setHoveredSlot}
        onSelectSlot={setSelectedSlot}
        onRemoveTile={handleDoubleClick}
      />
    </Canvas>
  );
}

export default App;
