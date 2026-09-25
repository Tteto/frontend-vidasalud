import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import Brand from "./Brand";

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className={`site-header${menuOpen ? " menu-open" : ""}`}>
        <Brand />
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="public-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span className="sr-only">{menuOpen ? "Cerrar menú" : "Abrir menú"}</span><span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
        <nav className="main-nav" id="public-navigation" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/servicios" onClick={() => setMenuOpen(false)}>Servicios</NavLink>
          <a href="/#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>
        <Link className="header-action" to="/login" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer" id="contacto">
        <div>
          <Brand compact />
          <p>Salud cercana, simple y humana.</p>
        </div>
        <div className="footer-links">
          <span>Atención al paciente</span>
          <a href="mailto:contacto@vidasalud.cl">contacto@vidasalud.cl</a>
          <span>+56 2 2345 6789</span>
        </div>
        <p className="footer-legal">© 2026 VidaSalud. Tu bienestar es nuestra prioridad.</p>
      </footer>
    </div>
  );
}