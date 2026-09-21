import type { Configuration } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

const TENANT_ID = import.meta.env.VITE_AZURE_TENANT_ID as string;
const SPA_CLIENT_ID = import.meta.env.VITE_AZURE_SPA_CLIENT_ID as string;
const API_CLIENT_ID = import.meta.env.VITE_AZURE_API_CLIENT_ID as string;
const BFF_BASE_URL = import.meta.env.VITE_BFF_BASE_URL as string;

/**
 * Scope de NUESTRA propia API (App Registration "vidasalud-api"), NO el
 * scope por defecto de Microsoft Graph (User.Read). Este es el punto donde
 * más se pierde puntaje: si aquí se pide un scope de Graph, el token que
 * llega al backend tiene audience equivocada y el BFF lo rechaza con 401.
 */
export const API_SCOPES = [`api://${API_CLIENT_ID}/access_as_user`];

/**
 * Configuración base de la instancia pública de MSAL.
 * authority apunta al tenant específico (no /common), porque esta app
 * es de un solo tenant corporativo.
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: SPA_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: "/",
    postLogoutRedirectUri: "/login",
  },
  cache: {
    // localStorage (no sessionStorage) para que el login sobreviva
    // a refrescos y a pestañas nuevas.
    cacheLocation: "localStorage",
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (level === LogLevel.Error) console.error(message);
      },
    },
  },
};

/**
 * protectedResourceMap: es la pieza que reemplaza al MsalInterceptor de
 * Angular. Le dice a MSAL "cuando se llame a esta URL, adjunta un access
 * token pedido con estos scopes". Sin esto, cualquier interceptor manual
 * no sabría qué scope pedir para qué endpoint.
 */
export const protectedResourceMap = new Map<string, string[]>([
  [`${BFF_BASE_URL}/api`, API_SCOPES],
]);

export const loginRequest = {
  scopes: API_SCOPES,
};
