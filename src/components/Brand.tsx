import { Link } from "react-router-dom";
import logo from "../assets/favicono.webp";

export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand${compact ? " brand-compact" : ""}`} to="/" aria-label="VidaSalud, inicio">
      <img className="brand-logo" src={logo} alt="" aria-hidden="true" />
      <span>Vida<span>Salud</span></span>
    </Link>
  );
}
