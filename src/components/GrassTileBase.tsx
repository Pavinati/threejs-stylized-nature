import { GrassHexagon, SoilHexagon } from "../ThreeJSInstances";

export function GrassTileBase() {
  return (
    <group rotation={[0, Math.PI / 6, 0]} name="grass-tile-base">
      <GrassHexagon position={[0, -0.05, 0]} name="grass" />
      <SoilHexagon position={[0, -0.15, 0]} name="soil" />
    </group>
  );
}
