import { Vector3 } from "three";
import { Line } from "@react-three/drei";
import { HEX_SIZE } from "../utilities/HexCoords";

const RING_HEIGHT = 0.06;

const OUTLINE_POINTS: [number, number, number][] = Array.from(
  { length: 6 + 1 },
  (_, i) => {
    const theta = (i / 6) * Math.PI * 2 + Math.PI / 6; // rotate so its flat on top
    return [
      HEX_SIZE * Math.sin(theta),
      RING_HEIGHT,
      HEX_SIZE * Math.cos(theta),
    ];
  },
);

const VARIANT_STYLE = {
  hover: { color: "#7fd8ff", opacity: 0.6, lineWidth: 2 },
  selected: { color: "#ffd24a", opacity: 0.9, lineWidth: 3 },
};

interface SlotHighlightProps {
  position: Vector3;
  variant: "hover" | "selected";
}

/** Ring drawn on top of whatever occupies a slot (a tile or an empty spot) to show hover/selection. */
export function SlotHighlight({ position, variant }: SlotHighlightProps) {
  const { color, opacity, lineWidth } = VARIANT_STYLE[variant];
  return (
    <group position={position} name={`slot-highlight-${variant}`}>
      <Line
        points={OUTLINE_POINTS}
        color={color}
        lineWidth={lineWidth}
        transparent
        opacity={opacity}
      />
    </group>
  );
}
