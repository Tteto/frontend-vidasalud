/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_TENANT_ID: string;
  readonly VITE_AZURE_SPA_CLIENT_ID: string;
  readonly VITE_AZURE_API_CLIENT_ID: string;
  readonly VITE_BFF_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
