// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

interface TutorialProps {
  onClose?: () => void;
}

const GITHUB_URL = "https://github.com/Pavinati/threejs-stylized-nature";

export function Tutorial({ onClose }: TutorialProps) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-black/60 backdrop-blur-sm text-white rounded-2xl overflow-hidden flex flex-col w-140">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <p className="font-semibold tracking-wide">
            ThreeJS Journey 24th challenge - Stylized Nature
          </p>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/90 transition-colors cursor-pointer"
            aria-label="Close"
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
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Accent line */}
        <div className="h-px bg-linear-to-r from-green-600/80 via-emerald-400/60 to-transparent" />

        {/* Description */}
        <p className="px-5 pt-3 pb-3 text-sm text-white/70 leading-relaxed">
          A stylized 3D nature scene builder made with React Three Fiber.
          <br />
          Place and arrange hex tiles to compose your own little landscape.
        </p>

        {/* Controls */}
        <div className="px-5 pb-3 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-0.5">
            Controls
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-center gap-3">
              <kbd className="bg-white/15 rounded-md px-2 py-0.5 text-xs font-mono whitespace-nowrap">
                Click
              </kbd>
              <span className="text-white/75">Select a tile from the deck</span>
            </li>
            <li className="flex items-center gap-3">
              <kbd className="bg-white/15 rounded-md px-2 py-0.5 text-xs font-mono whitespace-nowrap">
                Double click
              </kbd>
              <span className="text-white/75">Place tile on an empty slot</span>
            </li>
            <li className="flex items-center gap-3">
              <kbd className="bg-white/15 rounded-md px-2 py-0.5 text-xs font-mono whitespace-nowrap">
                Double click
              </kbd>
              <span className="text-white/75">Remove tile from a slot</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-3 border-t border-white/10 text-xs text-white/40">
          <a
            href={GITHUB_URL}
            target="_blank"
            className="hover:text-white/80 transition-colors"
          >
            Source code
          </a>
          <span>·</span>
          <a
            href={`${GITHUB_URL}/blob/main/LICENSES/AGPL-3.0-only.txt`}
            target="_blank"
            className="hover:text-white/80 transition-colors"
          >
            AGPL-3.0
          </a>
        </div>
      </div>
    </div>
  );
}
