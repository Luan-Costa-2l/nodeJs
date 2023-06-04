import { Request, Response, NextFunction } from 'express';
export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let succes = false;

        // verify if was authorized.

        if (succes) {
            next();
        } else {
            res.status(403);
            res.json({ error: 'Não autorizado.' });
        }
    }
}