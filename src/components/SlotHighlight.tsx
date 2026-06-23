import { Vector3 } from "three";
import { Line } from "@react-three/drei";

const HEX_RADIUS = 2;
const HEX_SEGMENTS = 6;
const RING_HEIGHT = 0.06;

const OUTLINE_POINTS: [number, number, number][] = Array.from(
  { length: HEX_SEGMENTS + 1 },
  (_, i) => {
    const theta = (i / HEX_SEGMENTS) * Math.PI * 2 + Math.PI / 6; // rotate so its flat on top
    return [
      HEX_RADIUS * Math.sin(theta),
      RING_HEIGHT,
      HEX_RADIUS * Math.cos(theta),
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
