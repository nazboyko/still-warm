import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/global.css";
import App from "./App.tsx";
import { openStaffEntrance } from "./utils/staffEntrance.ts";
// Last, so the booklet rules outrank every component sheet.
import "./styles/print.css";

// The museum's one sanctioned console line; its text lives in content/.
openStaffEntrance((...args: string[]) => console.log(...args));

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
