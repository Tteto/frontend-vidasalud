import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginRequest } from "../auth/authConfig";
import Brand from "../components/Brand";

export default function Login() {
  const { instance } = useMsal();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async () => {
    setCargando(true);
    setError(null);
    try {
      await instance.loginRedirect(loginRequest);
    } catch {
      setCargando(false);
      setError("No pudimos iniciar sesión. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="login-page">
      <section className="login-aside">
        <Brand />
        <div><p className="eyebrow">Portal de cuidado</p><h1>Tu bienestar, siempre cerca.</h1><p>Gestiona tus atenciones y encuentra la información que necesitas en un solo lugar.</p></div>
        <small>Un espacio seguro para continuar tu atención.</small>
      </section>
      <section className="login-panel">
        <span className="status-icon">V</span><h2>Bienvenido</h2><p>Ingresa con tu cuenta institucional para acceder al portal VidaSalud.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="login-button" onClick={handleLogin} disabled={cargando}>{cargando ? "Conectando..." : "Continuar con Microsoft"}</button>
        <Link className="login-back" to="/">← Volver al sitio principal</Link>
      </section>
    </div>
  );
}
