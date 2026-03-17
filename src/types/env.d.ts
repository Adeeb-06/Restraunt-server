declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: "development" | "production" | "test";
    MONGO_URI: string;
    FB_SERVICE_KEY: string;
    CLIENT_URL?: string;
    FRONTEND_URL?: string;
  }
}
