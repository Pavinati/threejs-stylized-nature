// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

interface TutorialProps {
  onClose?: () => void;
}

export function Tutorial({ onClose }: TutorialProps) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-black/60 backdrop-blur-sm text-white rounded-2xl px-6 py-4 flex flex-col gap-3 min-w-72">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Controls
          </p>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/90 transition-colors cursor-pointer"
          >
            <span>Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex items-center gap-3">
            <kbd className="bg-white/15 rounded-lg px-2 py-0.5 text-xs font-mono whitespace-nowrap">
              Click
            </kbd>
            <span className="text-white/80">Select a tile from the deck</span>
          </li>
          <li className="flex items-center gap-3">
            <kbd className="bg-white/15 rounded-lg px-2 py-0.5 text-xs font-mono whitespace-nowrap">
              Double click
            </kbd>
            <span className="text-white/80">Place tile on an empty slot</span>
          </li>
          <li className="flex items-center gap-3">
            <kbd className="bg-white/15 rounded-lg px-2 py-0.5 text-xs font-mono whitespace-nowrap">
              Double click
            </kbd>
            <span className="text-white/80">Remove tile from a slot</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
