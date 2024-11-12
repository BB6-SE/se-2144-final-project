import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import MyDeck from "./pages/MyDecksPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="decks" element={<MyDeck />} />s
        <Route path="flashcards" element={<FlashcardsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
