import { Request, Response } from 'express';
import * as UserService from '../services/UserService';

export const pong = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email && password) {

        const newUser = await UserService.createUser(email, password);

        if (newUser instanceof Error) {
            res.json({ error: newUser.message });
        } else {
            res.status(201);
            res.json({ id: newUser.id });
        }
        return;
    }

    res.json({ error: 'E-mail e/ou senha não enviado.'});
}

export const login = async  (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email && password) {

        const user = await UserService.findByEmail(email);

        if (user && UserService.matchPassword(password, user.password)) {
            res.status(200);
            res.json({ status: true });
            return;
        }
    }

    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    const list = await UserService.all();
    const users = list.map(item => item.email);
    res.json({ users });
}