import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user.user);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
