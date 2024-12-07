import { StrictMode } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotePage from "./pages/NotePage";
import FlashcardsPage from "./pages/FlashcardsPage";
import FlashcardsQuizPage from "./pages/FlashcardsQuizPage";
import UserDecksPage from "./pages/UserDecksPage";
import ProfilePage from "./pages/ProfilePage";
import LoadingScreen from "./components/LoadingScreen";
import SideBarLayout from "./components/Sidebar/Layout";
import NotesHistoryPage from "./pages/NotesHistoryPage";
import GeneratedVideosPage from "./pages/GeneratedVideosPage";

import useUserVerification from "./hooks/auth/useUserVerification";
import useUser from "./hooks/auth/useUser";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading: loadingVerification,
  } = useUserVerification();
  const { loading: loadingUser } = useUser();

  return loadingVerification || loadingUser ? (
    <LoadingScreen />
  ) : (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* routes with sidebar */}
          <Route element={<SideBarLayout />}>
            <Route
              path="/upload-notes"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/notes/:noteId"
              element={isAuthenticated ? <NotePage /> : <Navigate to="/" />}
            />
            <Route
              path="/decks"
              element={
                isAuthenticated ? <UserDecksPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/flashcards/:deckId"
              element={
                isAuthenticated ? <FlashcardsPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/quiz/:deckId"
              element={
                isAuthenticated ? <FlashcardsQuizPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/notes-history"
              element={
                isAuthenticated ? <NotesHistoryPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/generated-videos"
              element={
                isAuthenticated ? <GeneratedVideosPage /> : <Navigate to="/" />
              }
            />
          </Route>

          {/* routes with no sidebar */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <LandingPage />
              ) : (
                <Navigate to="/upload-notes" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/upload-notes" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <RegisterPage setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/upload-notes" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
