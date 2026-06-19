import { CameraHelper, PCFShadowMap } from "three";
import { Canvas } from "@react-three/fiber";
import { Helper, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useControls } from "leva";
import { HexGrid, type HexGridCell } from "./HexGrid.tsx";
import Trees from "./tiles/Trees.tsx";
import Rocks from "./tiles/Rocks.tsx";
import Bushes from "./tiles/Bushes.tsx";
import Mushrooms from "./tiles/Mushrooms.tsx";
import Stumps from "./tiles/Stumps.tsx";
import Logs from "./tiles/Logs.tsx";
import Flowers from "./tiles/Flowers.tsx";

const SCENE_LAYOUT: HexGridCell[] = [
  { q: 0, r: 0, Tile: Trees },
  { q: 1, r: 0, Tile: Rocks },
  { q: 0, r: 1, Tile: Bushes },
  { q: 1, r: -1, Tile: Logs },
  { q: 0, r: -1, Tile: Mushrooms },
  { q: -1, r: 0, Tile: Stumps },
  { q: -1, r: 1, Tile: Flowers },
];

function App() {
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
      <HexGrid cells={SCENE_LAYOUT} tileSize={2} />
    </Canvas>
  );
}

export default App;
