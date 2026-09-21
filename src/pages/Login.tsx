import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../auth/authConfig";

export default function Login() {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await instance.loginRedirect(loginRequest);
    // Fija la cuenta activa: sin esto, acquireTokenSilent no sabe para
    // qué cuenta pedir el token si hay más de una sesión en el navegador.
    instance.setActiveAccount(result.account);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <h1>VidaSalud</h1>
      <p>Plataforma de gestión de atenciones</p>
      <button onClick={handleLogin}>Iniciar sesión con Microsoft</button>
    </div>
  );
}
