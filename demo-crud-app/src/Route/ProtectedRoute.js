import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const storageToken = localStorage.getItem("token");

  return storageToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
