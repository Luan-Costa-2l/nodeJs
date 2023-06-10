import { Request, Response } from "express";
import { User } from "../models/User";
import { generate } from '../config/passport';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email && password) {

        const hasUser = await User.findOne({ where: { email } });

        if (!hasUser) {
            const newUser = await User.create({ email, password });
            const token = generate({ id: newUser.id });
            res.status(200);
            res.json({ status: true, token });
            return;
        } else {
            res.json({ error: 'e-mail já existe.' });
        }
    }

    res.json({ error: 'e-mail e/ou senha inválido.' });
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await User.findOne({ where: { email, password } });

        if (user) {
            const token = generate({ id: user.id });
            res.status(200);
            res.json({ status: true, token });
            return;
        }
    }

    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    const users = await User.findAll();
    const list = [];
    for (const user of users) {
        list.push(user.email);
    }
    res.status(200);
    res.json({ list });
}