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
  const { showLightHelper } = useControls({
    showLightHelper: {
      value: false,
      name: "Show Light Helper",
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
      >
        <orthographicCamera
          attach="shadow-camera"
          near={2}
          far={13}
          left={-3}
          right={3}
          top={3}
          bottom={-3}
        >
          {showLightHelper && <Helper type={CameraHelper} />}
        </orthographicCamera>
      </directionalLight>
      <HexGrid cells={SCENE_LAYOUT} tileSize={2} />
    </Canvas>
  );
}

export default App;
