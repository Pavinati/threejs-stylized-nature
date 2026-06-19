import type { Vector3 } from "three";

export interface FlowerProps {
  position?: number | Vector3 | [x: number, y: number, z: number];
  rotation?: number;
  color?: string;
  scale?: number;
}

const PETAL_COUNT = 6;
const STEM_BEND = Math.PI / 10;

export function Flower({
  position = [0, 0, 0],
  rotation = 0,
  color = "#e85d9e",
  scale = 1,
}: FlowerProps) {
  return (
    <group
      position={position}
      rotation={[0, rotation, 0]}
      scale={scale}
      name="flower"
    >
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow name="stem-lower">
        <cylinderGeometry args={[0.014, 0.017, 0.12, 6]} />
        <meshStandardMaterial color={"#5fb85f"} />
      </mesh>
      <group position={[0, 0.12, 0]} rotation={[0, 0, STEM_BEND]}>
        <mesh
          position={[0, 0.05, 0]}
          castShadow
          receiveShadow
          name="stem-upper"
        >
          <cylinderGeometry args={[0.011, 0.014, 0.1, 6]} />
          <meshStandardMaterial color={"#5fb85f"} />
        </mesh>
        <group position={[0, 0.11, 0]} name="bloom">
          {Array.from({ length: PETAL_COUNT }).map((_, i) => {
            const angle = (i / PETAL_COUNT) * Math.PI * 2;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh
                  position={[0.045, 0.01, 0]}
                  rotation={[0, 0, Math.PI / 6]}
                  scale={[1.6, 0.45, 0.85]}
                  castShadow
                  receiveShadow
                  name="petal"
                >
                  <sphereGeometry args={[0.04, 8, 6]} />
                  <meshStandardMaterial color={color} />
                </mesh>
              </group>
            );
          })}
          <mesh position={[0, 0.02, 0]} castShadow receiveShadow name="center">
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshStandardMaterial color={"#f2c14e"} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
