// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { useEffect, useRef } from "react";
import type { ComponentType, ReactNode } from "react";
import { useSpring, animated } from "@react-spring/three";
import type { Vector3 } from "three";
import { GrassTileBase } from "../tiles/forest/GrassTileBase";

const TWO_PI = 2 * Math.PI;
const RISE_HEIGHT = 0.5;
const SPAWN_FROM_Y = 15;

const easeInCubic = (t: number) => t * t * t;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

interface SpawnItemProps {
  delay?: number;
  animate: boolean;
  children: ReactNode;
}

function SpawnItem({ delay = 0, animate, children }: SpawnItemProps) {
  const [{ positionY }] = useSpring(() => ({
    from: { positionY: animate ? SPAWN_FROM_Y : 0 },
    to: { positionY: 0 },
    delay,
  }));
  return <animated.group position-y={positionY}>{children}</animated.group>;
}

export interface TileComponentProps {
  position?: Vector3;
  rotationStep?: number;
  animate?: boolean;
  onAnimatingChange?: (animating: boolean) => void;
}

export type TileComponentType = ComponentType<TileComponentProps>;

export interface TileProps extends TileComponentProps {
  resources: ReactNode[];
}

export function Tile({
  resources,
  position,
  rotationStep = 0,
  animate = true,
  onAnimatingChange,
}: TileProps) {
  const initialAngle = rotationStep * (Math.PI / 3);
  const accumulatedAngle = useRef(initialAngle);
  const prevStep = useRef(rotationStep);
  const onAnimatingChangeRef = useRef(onAnimatingChange);
  onAnimatingChangeRef.current = onAnimatingChange;

  const [{ y, rotationY }, api] = useSpring(() => ({
    y: 0,
    rotationY: initialAngle,
  }));

  useEffect(() => {
    if (rotationStep === prevStep.current) return;
    prevStep.current = rotationStep;

    const currentMod = ((accumulatedAngle.current % TWO_PI) + TWO_PI) % TWO_PI;
    const targetMod = rotationStep * (Math.PI / 3);
    const rawDelta = targetMod - currentMod;
    const delta = rawDelta - TWO_PI * Math.round(rawDelta / TWO_PI);
    accumulatedAngle.current += delta;
    const newAngle = accumulatedAngle.current;

    onAnimatingChangeRef.current?.(true);
    api.start({
      to: async (next) => {
        await next({
          y: RISE_HEIGHT,
          config: { duration: 100, easing: easeInCubic },
        });
        await next({
          rotationY: newAngle,
          config: { duration: 200, easing: easeInOutCubic },
        });
        await next({ y: 0, config: { duration: 100, easing: easeOutCubic } });
        onAnimatingChangeRef.current?.(false);
      },
    });
  }, [rotationStep, api]);

  return (
    <group position={position}>
      <animated.group position-y={y} rotation-y={rotationY}>
        <SpawnItem animate={animate}>
          <GrassTileBase />
        </SpawnItem>
        {resources.map((resource, i) => (
          <SpawnItem key={i} delay={i * 50 + 200} animate={animate}>
            {resource}
          </SpawnItem>
        ))}
      </animated.group>
    </group>
  );
}
