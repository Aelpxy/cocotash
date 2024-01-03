import { db } from '../../utils/db';
import { redis } from '../../utils/redis';
import { hash, verify } from '../../utils/argon2';
import { createHash, createHmac } from 'crypto';
import { generateJwtToken, verifyJwtToken } from '../../utils/jwt';
import { randId } from '../../utils/id';

import { ICreateUser, IGenerateSessionToken } from '../../types/user';
import { HttpError } from '../../utils/http';
import { generateHMAC } from '../../utils/crypto';

class UserService {
    private readonly db: typeof db;

    constructor() {
        this.db = db;
    }

    public async createUser(body: ICreateUser) {
        const user = await this.db.user.create({
            data: {
                id: randId('acc_', 16),
                name: body.name,
                email: body.email,
                password: await hash(body.password),
                secret: randId('sk_', 32),
            },
        });

        if (user.deleted) {
            throw new HttpError('Resource is not authorized to be created', 403, 'forbidden');
        }

        return user;
    }

    public async generateSessionToken(body: IGenerateSessionToken) {
        const user = await this.db.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            throw new HttpError(
                'Resource with the following email was not found',
                404,
                'not_found',
            );
        }

        const passwordMatched = await verify(user.password, body.password);

        if (!passwordMatched) {
            throw new HttpError(
                'Resource was found but provided credentials were invalid',
                403,
                'forbidden',
            );
        }

        if (!user.verified) {
            await this.db.user.update({ where: { id: user.id }, data: { verified: true } });
        }

        const timeToken = generateHMAC(randId('tts_', 16), user.secret);

        return await generateJwtToken(
            {
                object: 'token',
                user: {
                    id: user.id,
                    email: user.email,
                    time_token: timeToken,
                },
            },
            '3d',
        );
    }

    private async rotateKey(id: string) {
        return await this.db.user.update({ where: { id }, data: { secret: randId('sk_', 32) } });
    }

    public async deleteUser(id: string) {
        const user = await this.db.user.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        });

        return user;
    }
}

const userService = new UserService();

export default userService;
