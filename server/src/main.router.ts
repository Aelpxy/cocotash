import { FastifyInstance, FastifyReply } from 'fastify';

export default async function router(router: FastifyInstance) {
    router.get('/health', (_, reply: FastifyReply) => {
        reply.status(200).send({
            data: {
                status: 'ok',
            },
        });
    });

    router.register(() => {}, { prefix: '/users' });
    router.register(() => {}, { prefix: '/users/:user_id/events' });
    router.register(() => {}, { prefix: '/users/:user_id/teams' });
    router.register(() => {}, { prefix: '/teams/:team_id/databases' });
    router.register(() => {}, {
        prefix: '/teams/:team_id/databases/:database_id/backups',
    });
    router.register(() => {}, {
        prefix: '/teams/:team_id/databases/:database_id/cronjobs',
    });
}
