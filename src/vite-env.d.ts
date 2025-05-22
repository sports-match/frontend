/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_BASE_API: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
