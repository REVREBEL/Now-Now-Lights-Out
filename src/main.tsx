import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { installCopyOverrides } from "./apply-copy-overrides";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
installCopyOverrides();
