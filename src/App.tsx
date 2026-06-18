import { CameraHelper, PCFShadowMap } from "three";
import { Canvas } from "@react-three/fiber";
import { Helper, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useControls } from "leva";
import Trees from "./tiles/Trees.tsx";

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
      <Trees position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
