import { Request, Response } from 'express';
import { User } from '../models/User';

export const ping = async (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        const { email, password } = req.body;

        const hasUser = await User.findOne({ where: { email } });
        if (!hasUser) {
            const newUser = await User.create({ email, password });

            res.status(201);
            res.json({ id: newUser.id })
        } else {
            res.json({ error: 'E-mail já existe!' });
        }
    }
    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email, password } });

        if (user) {
            res.status(200);
            res.json({ status: true });
            return;
        }
    }
    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    const users = await User.findAll();
    let list: string[] = [];

    for (const user of users) {
        list.push(user.email);
    }

    res.json({ list });
}