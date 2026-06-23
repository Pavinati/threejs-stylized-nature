import { useCallback, useEffect, useState } from "react";
import { CameraHelper, PCFShadowMap } from "three";
import { Canvas } from "@react-three/fiber";
import { Helper, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useControls } from "leva";
import { HexLayout } from "./utilities/HexLayout.ts";
import type { AxialCoord } from "./utilities/HexCoords.ts";
import type { LayoutSlot } from "./utilities/HexLayout.ts";
import { LayoutRenderer } from "./components/LayoutRenderer.tsx";
import Trees from "./tiles/Trees.tsx";
import Rocks from "./tiles/Rocks.tsx";
import Bushes from "./tiles/Bushes.tsx";
import Mushrooms from "./tiles/Mushrooms.tsx";
import Stumps from "./tiles/Stumps.tsx";
import Logs from "./tiles/Logs.tsx";
import Flowers from "./tiles/Flowers.tsx";

const TILE_SIZE = 2;

const INITIAL_LAYOUT: LayoutSlot[] = [
  { position: { q: 0, r: 0 }, Tile: Trees },
  { position: { q: 1, r: 0 }, Tile: Rocks },
  { position: { q: 0, r: 1 }, Tile: Bushes },
  { position: { q: 1, r: -1 }, Tile: Logs },
  { position: { q: 0, r: -1 }, Tile: Mushrooms },
  { position: { q: -1, r: 0 }, Tile: Stumps },
  { position: { q: -1, r: 1 }, Tile: Flowers },
];

function App() {
  const [layout, setLayout] = useState(new HexLayout());

  useEffect(() => {
    setLayout((l) => l.init(INITIAL_LAYOUT));
  }, []);

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
      <OrbitControls />
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
        tileSize={TILE_SIZE}
        showEmptySlots
      />
    </Canvas>
  );
}

export default App;
