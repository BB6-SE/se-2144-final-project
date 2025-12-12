import { createRoot } from "react-dom/client";
import App from "./App";
import MainProvider from "./context/MainProvider";

import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <MainProvider>
    <Sonner />
    <Toaster />
    <App />
  </MainProvider>,
);
