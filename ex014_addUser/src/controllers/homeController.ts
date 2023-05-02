import { Request, Response } from "express";
import { User } from '../models/User';

export const homePage = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.render('pages/home', {
        users
    });
}

export const newUser = async (req: Request, res: Response) => {
    let { name, age } = req.body;
    if (name) {
        const newUser = User.build({ name });
        if (age) {
            newUser.age = parseInt(age);
        }
        await newUser.save();
    }
    
    res.redirect('/');
}