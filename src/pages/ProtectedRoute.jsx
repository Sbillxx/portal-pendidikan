import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/adminlogin" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
