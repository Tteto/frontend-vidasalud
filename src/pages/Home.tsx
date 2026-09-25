import { Link } from "react-router-dom";
import heroImage from "../assets/home.jpg";
import serviceImage from "../assets/service2.jpg";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Cuidado que se siente</p>
          <h1>Tu salud merece un lugar que te <em>conozca.</em></h1>
          <p className="hero-description">
            En VidaSalud conectamos personas, profesionales y tecnología para que cada atención sea más clara, oportuna y humana.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/login">Agendar una atención</Link>
            <Link className="text-link" to="/servicios">Conoce nuestros servicios <span aria-hidden="true">-&gt;</span></Link>
          </div>
          <div className="hero-note"><span className="status-dot" /> Atención centrada en ti, todos los días</div>
        </div>
        <div className="hero-visual">
          <img className="hero-photo" src={heroImage} alt="Profesional de salud en un espacio de atención" />
          <div className="visual-card visual-card-top"><strong>4.9 / 5</strong><span>Experiencia de pacientes</span></div>
          <div className="visual-card visual-card-bottom"><span className="mini-avatar">+</span><div><strong>Agenda acompañada</strong><span>Estamos contigo en cada paso</span></div></div>
        </div>
      </section>
      <section className="trust-strip">
        <span>Una experiencia de cuidado más clara</span>
        <div><strong>01</strong> Atención organizada</div>
        <div><strong>02</strong> Información accesible</div>
        <div><strong>03</strong> Acompañamiento continuo</div>
      </section>
      <section className="intro-section" id="nosotros">
        <div><p className="eyebrow">Tu bienestar, primero</p><h2>Todo lo que necesitas para sentirte bien acompañado.</h2></div>
        <p>Desde una consulta hasta el seguimiento de tus resultados, hacemos que cuidar tu salud sea una experiencia sencilla.</p>
      </section>
      <section className="feature-grid">
        <article><span className="feature-number">01</span><h3>Atención oportuna</h3><p>Encuentra el espacio y el profesional que necesitas sin vueltas.</p></article>
        <article><span className="feature-number">02</span><h3>Información clara</h3><p>Tus atenciones y próximos pasos siempre estarán a tu alcance.</p></article>
        <article><span className="feature-number">03</span><h3>Personas que escuchan</h3><p>Un equipo que entiende que cada historia de salud es distinta.</p></article>
      </section>
      <section className="usage-flow" aria-labelledby="usage-flow-title">
        <div className="usage-flow-heading"><p className="eyebrow">Cómo funciona</p><h2 id="usage-flow-title">Todo más claro desde el primer paso.</h2><p>Una experiencia sencilla para que puedas concentrarte en lo importante: tu bienestar.</p></div>
        <ol className="usage-flow-list">
          <li><span>01</span><div><h3>Accede a tu cuenta</h3><p>Ingresa al portal con tu cuenta institucional.</p></div></li>
          <li><span>02</span><div><h3>Revisa tus atenciones</h3><p>Consulta el estado de tus gestiones en un solo lugar.</p></div></li>
          <li><span>03</span><div><h3>Gestiona tu información</h3><p>Avanza tus tareas según el rol que tienes asignado.</p></div></li>
        </ol>
      </section>
      <section className="care-path">
        <div className="care-path-heading"><p className="eyebrow">Así te acompañamos</p><h2>Menos trámites.<br /><em>Más cuidado.</em></h2><img className="care-photo" src={serviceImage} alt="Espacio de atención de VidaSalud" loading="lazy" /></div>
        <div className="care-steps">
          <article><span>01</span><div><h3>Cuéntanos qué necesitas</h3><p>Partimos desde tu historia y tus objetivos, no desde un formulario.</p></div></article>
          <article><span>02</span><div><h3>Encuentra tu atención</h3><p>Te conectamos con el equipo y el momento que mejor se ajustan a ti.</p></div></article>
          <article><span>03</span><div><h3>Sigue avanzando</h3><p>Tu información queda contigo para que el siguiente paso sea más fácil.</p></div></article>
        </div>
      </section>
      <section className="patient-quote">
        <span className="quote-mark">“</span>
        <blockquote>Sentí que por fin alguien estaba mirando mi salud completa, no solo el motivo de mi consulta.</blockquote>
        <p>Camila R. · Paciente VidaSalud</p>
      </section>
    </div>
  );
}