import type { ReactNode } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useRoles } from "../auth/useRoles";
import Brand from "./Brand";

export default function PortalLayout({ children }: { children: ReactNode }) {
  const { instance, accounts } = useMsal();
  const roles = useRoles();
  const location = useLocation();
  const account = accounts[0];

  const handleLogout = () => instance.logoutPopup({ postLogoutRedirectUri: "/login" });

  return (
    <div className="portal-shell">
      <header className="portal-header">
        <Brand compact />
        <nav className="portal-nav" aria-label="Navegación del portal">
          <NavLink className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">Resumen</NavLink>
          <NavLink to="/appointments">Atenciones</NavLink>
          {roles.includes("Admin") && <NavLink to="/catalog">Catálogo</NavLink>}
          {roles.includes("Admin") && <NavLink to="/reports">Reportería</NavLink>}
        </nav>
        <div className="portal-account"><span className="account-avatar">{(account?.name ?? account?.username ?? "U").charAt(0).toUpperCase()}</span><span className="account-name">{account?.name ?? account?.username ?? "Usuario"}</span><button className="icon-button" onClick={handleLogout} aria-label="Cerrar sesión" title="Cerrar sesión">↗</button></div>
      </header>
      <main className="portal-content">{children}</main>
      <footer className="portal-footer"><span>VidaSalud</span><span>Tu salud, acompañada.</span><Link to="/">Volver al sitio público</Link></footer>
    </div>
  );
}