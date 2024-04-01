import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
