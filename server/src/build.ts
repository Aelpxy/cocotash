import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import fastifyEtag from '@fastify/etag';
import fastifyAuth from '@fastify/auth';
import rawbody from 'fastify-raw-body';
import fastifyMultipart from '@fastify/multipart';
import { fastifyYupSchema } from 'fastify-yup-schema';

import router from './main.router';

import { randId } from './utils/id';
import { redis } from './utils/redis';
import { loggerConfig } from './utils/log';

const buildServer = (): FastifyInstance => {
    const app: FastifyInstance = fastify({
        trustProxy: true,
        logger: loggerConfig,
        genReqId() {
            return randId('req_', 16);
        },
    });

    app.register(helmet);
    app.register(cors, { origin: process.env.ORIGIN });
    app.register(fastifyEtag);
    app.register(fastifyMultipart, {
        attachFieldsToBody: true,
        limits: {
            fileSize: 100 * 1024 * 1024,
        },
    });
    app.register(rateLimit, {
        global: true,
        max: 100,
        ban: 101,
        timeWindow: '1 hour',
        redis: redis,
        nameSpace: 'rate-limit',
    });
    app.register(rawbody, {
        field: 'rawBody',
        global: false,
        encoding: 'utf8',
        runFirst: true,
        routes: [],
    });
    app.register(fastifyAuth);
    app.register(fastifyYupSchema);

    app.setErrorHandler(function (error: any, _, reply) {
        return reply.status(error.statusCode as number).send({
            error: {
                message: error.message,
                type: error.type || 'internal_server_error',
            },
        });
    });

    app.register(router);

    return app;
};

export default buildServer;
