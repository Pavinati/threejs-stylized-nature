import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Leva } from "leva";
import "./index.css";
import App from "./App.tsx";

const debug = location.hash === "#debug";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Leva hidden={!debug} />
    <App />
  </StrictMode>,
);
