import { useMsal } from "@azure/msal-react";
import { useRoles } from "../auth/useRoles";

export default function Dashboard() {
  const { instance, accounts } = useMsal();
  const roles = useRoles();
  const account = accounts[0];

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/login",
    });
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Hola, {account?.name ?? account?.username}</h1>
        <p>Roles: {roles.length ? roles.join(", ") : "(sin roles asignados)"}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <nav>
        <a href="/appointments">Atenciones</a>
        {roles.includes("Admin") && <a href="/catalog">Catálogo</a>}
        {roles.includes("Admin") && <a href="/reports">Reportería</a>}
      </nav>
    </div>
  );
}
