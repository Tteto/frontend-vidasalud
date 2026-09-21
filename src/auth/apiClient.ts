import axios from "axios";
import type { IPublicClientApplication } from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { API_SCOPES } from "./authConfig";

const BFF_BASE_URL = import.meta.env.VITE_BFF_BASE_URL as string;

export const api = axios.create({ baseURL: BFF_BASE_URL });

/**
 * Esto hace el trabajo del MsalInterceptor de Angular: antes de cada
 * request, pide (o reutiliza desde cache) un access token con el scope
 * de nuestra API y lo pega como Bearer.
 *
 * acquireTokenSilent primero, y solo si falla por que se requiere
 * interacción (sesión vencida, MFA, consentimiento pendiente) se cae a
 * un popup. Esto evita relogins innecesarios en cada llamada.
 */
export function registerApiInterceptor(msalInstance: IPublicClientApplication) {
  api.interceptors.request.use(async (config) => {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw new Error("No hay cuenta activa: el usuario no está autenticado.");
    }

    try {
      const result = await msalInstance.acquireTokenSilent({
        scopes: API_SCOPES,
        account,
      });
      config.headers.Authorization = `Bearer ${result.accessToken}`;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        const result = await msalInstance.acquireTokenPopup({
          scopes: API_SCOPES,
        });
        config.headers.Authorization = `Bearer ${result.accessToken}`;
      } else {
        throw error;
      }
    }

    return config;
  });

  // Si el BFF responde 401/403, no tiene sentido reintentar solo: se
  // avisa arriba para que la UI redirija a /login o muestre "sin permiso".
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Token inválido o expirado según el BFF.");
      }
      if (error.response?.status === 403) {
        console.warn("El usuario no tiene el rol requerido para este endpoint.");
      }
      return Promise.reject(error);
    }
  );
}
