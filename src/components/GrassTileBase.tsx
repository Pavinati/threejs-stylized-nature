export function GrassTileBase() {
  return (
    <group rotation={[0, Math.PI / 6, 0]} name="grass-tile-base">
      <mesh position={[0, -0.05, 0]} receiveShadow name="grass">
        <cylinderGeometry args={[2, 2, 0.1, 6]} />
        <meshStandardMaterial color={"#85e385"} />
      </mesh>
      <mesh position={[0, -0.15, 0]} name="soil">
        <cylinderGeometry args={[2, 2, 0.1, 6, 1, true]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
    </group>
  );
}
