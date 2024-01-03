import fastify from 'fastify';
import { config } from 'dotenv';

config();

const loggerConfig: any = {
    level: 'info',
    redact: ['headers.authorization'],
    serializers: {
        req(request: any) {
            return {
                method: request.method,
                url: request.url,
                hostname: request.hostname,
                remoteAddress: request.ip,
                remotePort: request.socket.remotePort,
            };
        },
    },
};

const app = fastify({ logger: loggerConfig });

const log = app.log;

export { log, loggerConfig };
