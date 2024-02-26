import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { ExplorePage } from "../pages/ExplorePage";
import { LikesPage } from "../pages/LikesPage";

export const PageRoutes = () => {
  const { authUser, loading } = useAuthContext();

  if (loading) return null;


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signup"
        element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/explore"
        element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />}
      />

      <Route
        path="/likes"
        element={authUser ? <LikesPage /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
};
