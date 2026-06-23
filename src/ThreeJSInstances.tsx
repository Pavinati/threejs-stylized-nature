import { createInstances } from "@react-three/drei";
import { HEX_SIZE } from "./utilities/HexCoords";

// Tree
export const [TrunkInstances, Trunk] = createInstances();
export const [LowLeavesInstances, LowLeaves] = createInstances();
export const [HighLeavesInstances, HighLeaves] = createInstances();

// Log
export const [OuterLogInstances, OuterLog] = createInstances();
export const [EndLogInstances, EndLog] = createInstances();

// Stump
export const [StumpInstances, Stump] = createInstances();

// Bush
export const [LobeInstances, Lobe] = createInstances();

// Rock
export const [RockInstances, Rock] = createInstances();

// Mushroom
export const [MushroomStripeInstances, MushroomStripe] = createInstances();
export const [UpperCapInstances, UpperCap] = createInstances();
export const [LowerCapInstances, LowerCap] = createInstances();

// Flower
export const [StemIstances, Stem] = createInstances();
export const [PetalIstances, Petal] = createInstances();
export const [BloomIstances, Bloom] = createInstances();

// Tile Base
export const [GrassHexagonIntances, GrassHexagon] = createInstances();
export const [SoilHexagonInstances, SoilHexagon] = createInstances();
export const [GreyHexagonInstances, GreyHexagon] = createInstances();

// Tile Slots

interface ThreeJSInstancesProps {
  children: React.ReactNode;
}

function BaseTileInstances({ children }: ThreeJSInstancesProps) {
  return (
    <GrassHexagonIntances receiveShadow>
      <cylinderGeometry args={[HEX_SIZE, HEX_SIZE, 0.1, 6]} />
      <meshStandardMaterial color={"#85e385"} />

      <SoilHexagonInstances>
        <cylinderGeometry args={[HEX_SIZE, HEX_SIZE, 0.1, 6, 1, true]} />
        <meshStandardMaterial color={"brown"} />

        <GreyHexagonInstances>
          <cylinderGeometry args={[HEX_SIZE, HEX_SIZE, 0.02, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />

          {children}
        </GreyHexagonInstances>
      </SoilHexagonInstances>
    </GrassHexagonIntances>
  );
}

function ResourceInstances({ children }: ThreeJSInstancesProps) {
  return (
    <TrunkInstances castShadow receiveShadow>
      <cylinderGeometry args={[0.15, 0.15, 0.2, 8, 1, true]} />
      <meshStandardMaterial color={"#6b4a2f"} />

      <LowLeavesInstances castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.35, 0.3, 8]} />
        <meshStandardMaterial color={"green"} />

        <HighLeavesInstances castShadow receiveShadow>
          <coneGeometry args={[0.3, 1, 8]} />
          <meshStandardMaterial color={"green"} />

          <LobeInstances castShadow receiveShadow>
            <icosahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial color={"#5fb85f"} />

            <RockInstances castShadow receiveShadow>
              <dodecahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={"#8a8a8a"} />

              <OuterLogInstances castShadow receiveShadow>
                <cylinderGeometry args={[0.15, 0.15, 0.8, 8, 1, true]} />
                <meshStandardMaterial color={"#6b4a2f"} />

                <EndLogInstances castShadow receiveShadow>
                  <circleGeometry args={[0.15, 8]} />
                  <meshStandardMaterial color={"#d8c19a"} />

                  <StumpInstances castShadow receiveShadow>
                    <cylinderGeometry args={[0.18, 0.22, 0.3, 8]} />
                    <meshStandardMaterial color={"#6b4a2f"} />

                    {children}
                  </StumpInstances>
                </EndLogInstances>
              </OuterLogInstances>
            </RockInstances>
          </LobeInstances>
        </HighLeavesInstances>
      </LowLeavesInstances>
    </TrunkInstances>
  );
}

function MushroomAndFlowerInstances({ children }: ThreeJSInstancesProps) {
  return (
    <MushroomStripeInstances castShadow receiveShadow>
      <cylinderGeometry args={[0.04, 0.05, 0.16, 8, 1, true]} />
      <meshStandardMaterial color={"#f1e6d2"} />

      <UpperCapInstances castShadow receiveShadow>
        <sphereGeometry args={[0.12, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={"#c43d3d"} />

        <LowerCapInstances castShadow>
          <circleGeometry args={[0.12, 8]} />
          <meshStandardMaterial color={"#c43d3d"} />

          <StemIstances castShadow receiveShadow>
            <cylinderGeometry args={[0.014, 0.017, 0.12, 6]} />
            <meshStandardMaterial color={"#5fb85f"} />

            <BloomIstances castShadow receiveShadow>
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshStandardMaterial color={"#f2c14e"} />

              <PetalIstances castShadow receiveShadow>
                <sphereGeometry args={[0.04, 8, 6]} />
                {/* white color so it can be multiplied by the mesh */}
                <meshStandardMaterial />

                {children}
              </PetalIstances>
            </BloomIstances>
          </StemIstances>
        </LowerCapInstances>
      </UpperCapInstances>
    </MushroomStripeInstances>
  );
}

export function ThreeJSInstances({ children }: ThreeJSInstancesProps) {
  return (
    <BaseTileInstances>
      <ResourceInstances>
        <MushroomAndFlowerInstances>{children}</MushroomAndFlowerInstances>
      </ResourceInstances>
    </BaseTileInstances>
  );
}
