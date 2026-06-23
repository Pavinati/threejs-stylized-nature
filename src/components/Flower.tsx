import type { Euler, Vector3 } from "three";
import { Stem, Bloom, Petal } from "../ThreeJSInstances";

export interface FlowerProps {
  position?: Vector3;
  rotation?: Euler;
  color?: string;
  scale?: number;
}

const PETAL_COUNT = 6;
const STEM_BEND = Math.PI / 10;

export function Flower({
  position,
  rotation,
  color = "#e85d9e",
  scale = 1,
}: FlowerProps) {
  return (
    <group position={position} rotation={rotation} scale={scale} name="flower">
      <Stem position={[0, 0.06, 0]} name="stem-lower" />
      <group position={[0, 0.12, 0]} rotation={[0, 0, STEM_BEND]}>
        <Stem position={[0, 0.05, 0]} scale={0.9} name="stem-upper" />
        <group position={[0, 0.11, 0]} name="bloom">
          {Array.from({ length: PETAL_COUNT }).map((_, i) => {
            const angle = (i / PETAL_COUNT) * Math.PI * 2;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <Petal
                  position={[0.045, 0.01, 0]}
                  rotation={[0, 0, Math.PI / 6]}
                  scale={[1.6, 0.45, 0.85]}
                  name="petal"
                  color={color}
                />
              </group>
            );
          })}
          <Bloom position={[0, 0.02, 0]} name="center" />
        </group>
      </group>
    </group>
  );
}
