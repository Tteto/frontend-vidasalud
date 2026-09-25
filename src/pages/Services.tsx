import { Link } from "react-router-dom";
import serviceImage from "../assets/service2.jpg";

const services = [
  ["01", "Medicina general", "Una mirada completa para resolver tus necesidades de salud de hoy."],
  ["02", "Salud preventiva", "Acompañamiento para anticiparte y cuidar lo que más importa."],
  ["03", "Exámenes y controles", "Resultados y seguimiento con información fácil de entender."],
  ["04", "Atención continua", "Un equipo que mantiene el hilo de tu proceso, estés donde estés."],
];

export default function Services() {
  return <div className="services-page"><section className="page-heading"><p className="eyebrow">Nuestros servicios</p><h1>Un cuidado que se adapta a tu vida.</h1><p>Soluciones de salud pensadas para acompañarte con cercanía, experiencia y tecnología.</p><img className="services-photo" src={serviceImage} alt="Profesional de salud conversando con una paciente" /></section><section className="service-list">{services.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{description}</p></div><span className="service-arrow">-&gt;</span></article>)}</section><section className="service-cta"><h2>Da el primer paso hacia tu bienestar.</h2><Link className="button button-primary" to="/login">Entrar al portal</Link></section></div>;
}