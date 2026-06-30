// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import type { RotationDirection } from "../utilities/HexLayout.ts";

interface RotateButtonProps {
  direction: RotationDirection;
  onClick: () => void;
  disabled?: boolean;
}

export function RotateButton({
  direction,
  onClick,
  disabled,
}: RotateButtonProps) {
  const isCCW = direction === "ccw";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white/80 hover:text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={isCCW ? { transform: "scaleX(-1)" } : undefined}
      >
        <path d="M21.5 2v6h-6" />
        <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
      </svg>
      {isCCW ? "Rotate CCW" : "Rotate CW"}
    </button>
  );
}
