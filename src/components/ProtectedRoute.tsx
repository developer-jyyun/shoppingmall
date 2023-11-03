import React from "react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// 로그인 한 사용자 있는지 확인
// 그 사용자의 어드민 권한 여부 확인
// requireAmdmin이 true인 경우 로그인 되어 있고 어드민권한도 있어야 함
// 조건에 맞지 않으면 /상위 경로로 이동
// 조건에 맞는 경우에만 전달된 children 보여줌

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}
export default function ProtectedRoute({
  children,
  requireAdmin,
}: ProtectedRouteProps) {
  const { user } = useAuthContext();
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
