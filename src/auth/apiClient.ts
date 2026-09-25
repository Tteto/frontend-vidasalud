import axios from "axios";
import type { IPublicClientApplication } from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { API_SCOPES } from "./authConfig";

const BFF_BASE_URL = "http://localhost:8080";

export const api = axios.create({ baseURL: BFF_BASE_URL });

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