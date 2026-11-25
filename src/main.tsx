import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SuplementosSalesPage } from "./pages/SuplementosSalesPage";
import "./index.css";

const normalizedPath = window.location.pathname.toLowerCase().replace(/\/+$/, "");
const isSuplementosPage = normalizedPath === "/suplementos";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isSuplementosPage ? <SuplementosSalesPage /> : <App />}
  </StrictMode>
);
