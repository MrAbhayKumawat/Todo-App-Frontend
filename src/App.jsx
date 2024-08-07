import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Todos from "./pages/Todos";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./common/Header/Navbar";
import PageNotFound from "./components/PageNotFound";
import Cookies from "js-cookie";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const token = Cookies.get("token");

  if (!token && (currentPath === "/Todos" || currentPath === "/todos")) {
    return <Navigate to="/login" />;
  }

  if (token && (currentPath === "/login" || currentPath === "/register")) {
    return <Navigate to="/todos" />;
  }

  return (
    <>
      {currentPath !== "/login" && currentPath !== "/register" && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
