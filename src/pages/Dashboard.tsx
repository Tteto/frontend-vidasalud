import { useMsal } from "@azure/msal-react";
import { useRoles } from "../auth/useRoles";

export default function Dashboard() {
  const { accounts } = useMsal();
  const roles = useRoles();
  const account = accounts[0];

  return (
    <div className="dashboard-page">
      <section className="portal-page-header">
        <div><p className="eyebrow">Resumen de tu portal</p><h1>Hola, {account?.name ?? account?.username}</h1><p>Aquí tienes todo lo necesario para continuar con tu atención.</p></div>
        <div className="dashboard-role">Perfil activo: <strong>{roles.length ? roles.join(", ") : "sin rol asignado"}</strong></div>
      </section>
      <section className="dashboard-overview">
        <article><span className="overview-icon">✓</span><div><strong>Perfil activo</strong><p>{roles.length ? roles.join(", ") : "Sin roles asignados"}</p></div></article>
        <article><span className="overview-icon">→</span><div><strong>Próximo paso</strong><p>Revisa tus atenciones para ver información disponible.</p></div></article>
      </section>
      <section className="dashboard-main">
        <p className="eyebrow">Portal VidaSalud</p>
        <nav className="dashboard-nav" aria-label="Herramientas del portal">
          <a href="/appointments"><span>01</span><strong>Atenciones</strong><small>Revisa y gestiona tus atenciones</small><b>-&gt;</b></a>
          {roles.includes("Admin") && <a href="/catalog"><span>02</span><strong>Catálogo</strong><small>Administra prestaciones disponibles</small><b>-&gt;</b></a>}
          {roles.includes("Admin") && <a href="/reports"><span>03</span><strong>Reportería</strong><small>Consulta indicadores de operación</small><b>-&gt;</b></a>}
        </nav>
      </section>
    </div>
  );
}
