// SPDX-FileCopyrightText: 2026 Mattia Pavinati <mattia.pavinati@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Leva } from "leva";
import { enableMapSet } from "immer";
import "./index.css";
import App from "./App.tsx";

// Enable Map and Set support in Immer
enableMapSet();

const debug = location.hash === "#debug";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Leva hidden={!debug} />
    <App />
  </StrictMode>,
);
