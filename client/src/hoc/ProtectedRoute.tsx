import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  children?: JSX.Element;
  redirect: string;
  isAllowed: boolean;
};

export default function ProtectedRoute({ children, redirect, isAllowed }: Props): JSX.Element {
  if (!isAllowed) return <Navigate to={redirect} />;
  return children || <Outlet />;
}
