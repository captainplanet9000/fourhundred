import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { SeoProvider } from "./providers/SeoProvider";
import { Web3Provider } from "./providers/Web3Provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SeoProvider>
      <Web3Provider>
        <App />
      </Web3Provider>
    </SeoProvider>
  </ThemeProvider>,
);