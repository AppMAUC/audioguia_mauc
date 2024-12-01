import { PropsWithChildren } from "react";
import { Admin } from "../types/Admin";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Mobile from "../../../components/ui/Mobile";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRole?: Admin["accessLevel"];
};

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const { currentAdmin, loading } = useAuth();

  if (loading || currentAdmin === undefined) {
    return <Mobile.Loading />;
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
