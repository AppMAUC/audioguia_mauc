import { PropsWithChildren } from "react";
import { Admin } from "../types/Admin";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRole?: Admin["accessLevel"];
};

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const { currentAdmin, loading } = useAuth();

  if (loading || currentAdmin === undefined) {
    return (
      <div style={{ textAlign: "center", padding: "1rem" }}>Carregando...</div>
    );
  }

  if (
    !currentAdmin ||
    (allowedRole && allowedRole != currentAdmin?.accessLevel)
  ) {
    return <Navigate to={"/admin"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
