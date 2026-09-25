import type { Configuration } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

// Valores inyectados directamente
const TENANT_ID = "07588112-a256-4afe-b697-a9414f801db5";
const SPA_CLIENT_ID = "71795ba5-6202-4cc7-a6f5-ed9cbeafb078";
const API_CLIENT_ID = "2989b1bf-8007-43cc-b593-cc933a51b313";
const BFF_BASE_URL = "http://localhost:8080";

export const API_SCOPES = [`api://${API_CLIENT_ID}/access_as_user`];

export const msalConfig: Configuration = {
  auth: {
    clientId: SPA_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: "/",
    postLogoutRedirectUri: "/login",
  },
  cache: {
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

export const protectedResourceMap = new Map<string, string[]>([
  [`${BFF_BASE_URL}/api`, API_SCOPES],
]);

export const loginRequest = {
  scopes: API_SCOPES,
};