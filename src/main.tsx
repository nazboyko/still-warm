import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/global.css";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
const show = (page: ReactNode) => root.render(<StrictMode>{page}</StrictMode>);

if (import.meta.env.DEV && window.location.pathname === "/dev/gallery") {
  // Dev-only reference page; the condition is compile-time false in builds.
  void import("./dev/GalleryPage.tsx").then(({ GalleryPage }) =>
    show(<GalleryPage />),
  );
} else {
  show(<App />);
}
