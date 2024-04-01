import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    Swal.fire(alertList.infoMessage("로그인이 필요합니다."));
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
