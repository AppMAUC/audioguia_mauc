import { PropsWithChildren } from "react";
import { Admin } from "../types/Admin";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRole?: Admin["accessLevel"];
};

const ProtectedRoute = ({ allowedRole, children }: ProtectedRouteProps) => {
  const { currentAdmin } = useAuth();

  if (currentAdmin === undefined) {
    return <div>Loading...</div>;
  }

  if (
    (allowedRole && allowedRole != currentAdmin?.accessLevel) ||
    currentAdmin === null
  ) {
    return <div>Unauthorized</div>;
  }

  return children;
};

export default ProtectedRoute;
