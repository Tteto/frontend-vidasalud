import { useMsal } from "@azure/msal-react";

export type Rol = "Admin" | "Recepcionista" | "Paciente" | "Auditor";

/**
 * Los roles NO vienen del access token que consume la API, sino del
 * idTokenClaims de la cuenta activa (claim "roles", tal como se
 * definieron en Azure AD -> App roles de vidasalud-api).
 * Esto es lo que pide el indicador de la rúbrica: "leer roles y scopes
 * desde los claims del token".
 */
export function useRoles(): Rol[] {
  const { accounts } = useMsal();
  const account = accounts[0];
  if (!account?.idTokenClaims) return [];

  const claims = account.idTokenClaims as { roles?: string[] };
  return (claims.roles ?? []) as Rol[];
}

export function useHasRole(rol: Rol): boolean {
  return useRoles().includes(rol);
}
