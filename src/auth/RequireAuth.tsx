import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import type { Rol } from "./useRoles";
import { useRoles } from "./useRoles";

interface Props {
  children: ReactNode;
  /** Si se omite, solo exige estar autenticado (cualquier rol). */
  rolesPermitidos?: Rol[];
}

/**
 * Reemplaza al MsalGuard de Angular a nivel de ruta, y agrega además la
 * autorización por rol que en Angular normalmente se hace con un guard
 * propio adicional (RoleGuard).
 */
export function RequireAuth({ children, rolesPermitidos }: Props) {
  const isAuthenticated = useIsAuthenticated();
  const rolesDelUsuario = useRoles();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.some((r) => rolesDelUsuario.includes(r))) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <>{children}</>;
}
