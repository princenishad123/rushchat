import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthCheck";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import { useThemeStore } from "./store/useThemeStore";
import Chats from "./components/Chats";

const App = () => {
  const { authUser, checkAuth, authChecking } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authChecking) {
    return <Loader />;
  }

  return (
    <div data-theme={theme} className="container mx-auto">
      <div className="max-md:hidden">
        <Navbar />
      </div>

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/profile"} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
