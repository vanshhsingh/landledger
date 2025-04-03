import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

createRoot(document.getElementById("root")!).render(<App />);
