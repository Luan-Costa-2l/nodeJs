import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

export const Auth = {
    basicPrivate: async (req: Request, res: Response, next: NextFunction) => {
        let succes = false;

        // verify if was authorized.
        if (req.headers.authorization) {
            const hash = req.headers.authorization.substring(6);
            const decoded = Buffer.from(hash, 'base64').toString();
            const data = decoded.split(':');

            if (data.length === 2) {
                const hasUser = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                })

                succes = !!hasUser;
            }
        }

        if (succes) {
            next();
        } else {
            res.status(403);
            res.json({ error: 'Não autorizado.' });
        }
    },
    private: async (req: Request, res: Response, next: NextFunction) => {
        let succes = false;

        // verify if was authorized.
        if (req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');

            if (authType === 'Bearer') {
                try {
                    const decoded = JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    );

                    succes = true;
                } catch (err) {
                    
                }

            }
        }

        if (succes) {
            next();
        } else {
            res.status(403);
            res.json({ error: 'Não autorizado.' });
        }
    }
}