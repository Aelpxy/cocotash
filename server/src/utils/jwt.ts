import jwt from 'jsonwebtoken';

import { config } from 'dotenv';

config();

const generateJwtToken = (payload: object, expiresIn: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: expiresIn },
            (error, token: any) => {
                if (error) {
                    reject(new Error('Error generating JWT token'));
                } else {
                    resolve(token);
                }
            },
        );
    });
};

const verifyJwtToken = async (token: string): Promise<any> => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
};

export { generateJwtToken, verifyJwtToken };
