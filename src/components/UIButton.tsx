// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import type { ReactNode } from "react";

interface UIButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function UIButton({ icon, label, onClick, disabled }: UIButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white/80 hover:text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {icon}
      {label}
    </button>
  );
}
