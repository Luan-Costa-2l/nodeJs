import { Request, Response } from "express";
import { User } from "../models/User";


export const login = async (req: Request, res: Response) => {
    res.json({ status: true, user: req.user });
}

export const list = async (req: Request, res: Response) => {
    const users = await User.findAll();
    const list = [];
    for (const user of users) {
        list.push(user.email);
    }
    res.status(200);
    res.json({list});
}