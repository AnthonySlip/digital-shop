/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_HOST: string;
    readonly VITE_GIT_ABOUT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}