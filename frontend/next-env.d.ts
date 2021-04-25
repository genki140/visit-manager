/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly SITE_URL: string | undefined;
    readonly SITE_PORT: string | undefined;
    readonly API_PORT: string | undefined;
    readonly GOOGLE_MAP_API_KEY: string | undefined;
  }
}
