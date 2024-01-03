import { config } from 'dotenv';
import buildServer from './build';

import { db } from './utils/db';

config();

const server = buildServer();

const start = (port: number): void => {
    try {
        server.log.info(`Server running in ${process.env.NODE_ENV} mode`);

        db.$connect()
            .then(() => server.log.info('Database client connected'))
            .catch((error: any) => {
                server.log.error('Failed to connect to database', error);
                process.exit(1);
            });

        server
            .listen({ port: port, host: '0.0.0.0' })
            .then(() => server.log.info('Server is ready to serve requests'));
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

const shutdown = async () => {
    server.log.info('Starting graceful shutdown');

    server.log.info('Disconnecting from database');
    await db.$disconnect();

    await server.close();

    server.log.info('Server is shut down');
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start(Number(process.env.PORT) || 8080);

export default server;