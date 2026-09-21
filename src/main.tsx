import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { msalConfig } from "./auth/authConfig";
import { registerApiInterceptor } from "./auth/apiClient";
import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

// Al terminar login (popup o redirect), fija la cuenta como activa.
// Sin esto, acquireTokenSilent puede no saber para qué cuenta operar
// cuando el usuario tiene más de una cuenta en el navegador.
msalInstance.addEventCallback((event) => {
  if (
    (event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
    event.payload &&
    "account" in event.payload &&
    event.payload.account
  ) {
    msalInstance.setActiveAccount(event.payload.account);
  }
});

registerApiInterceptor(msalInstance);

async function bootstrap() {
  await msalInstance.initialize();
  // Procesa la respuesta si venimos de un redirect de login.
  await msalInstance.handleRedirectPromise();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </React.StrictMode>
  );
}

bootstrap();
