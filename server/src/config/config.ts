const CONSTANTS = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    ORIGIN: process.env.ORIGIN,

    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,

    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    AES_SECRET_KEY: process.env.AES_SECRET_KEY,

    DAEMON_HTTP_URL: process.env.DAEMON_HTTP_URL,
    DAEMON_API_KEY: process.env.DAEMON_API_KEY,
};

export { CONSTANTS };
