import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SuplementosSalesPage } from "./pages/SuplementosSalesPage";
import { EmbaixadorSalesPage } from "./pages/EmbaixadorSalesPage";
import "./index.css";

const normalizedPath = window.location.pathname.toLowerCase().replace(/\/+$/, "");
const isSuplementosPage = normalizedPath === "/suplementos";
const isEmbaixadorPage = normalizedPath === "/embaixador";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isSuplementosPage ? (
      <SuplementosSalesPage />
    ) : isEmbaixadorPage ? (
      <EmbaixadorSalesPage />
    ) : (
      <App />
    )}
  </StrictMode>
);
