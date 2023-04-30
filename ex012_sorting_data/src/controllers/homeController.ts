import { Request, Response } from "express";
import { User } from '../models/User';

export const homePage = async (req: Request, res: Response) => {
    let users = await User.findAll();
    res.render('pages/home', {
        users
    });
}