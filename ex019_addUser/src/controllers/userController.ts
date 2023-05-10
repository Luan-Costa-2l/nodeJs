import { Request, Response } from "express";
import User from "../models/User";

const formatInteres = (string: string) => {
    return string.split(',').map(item => item.trim().toLowerCase());
}

export const newUser = async (req: Request, res: Response) => {
    if (req.body) {
        let result = await User.findOne({ where: {"name.firstName": req.body.firstName}});

        if (!result) {
            let user = new User();

            user.name.firstName = req.body.firstName;
            user.name.lastName = req.body.lastName;
            user.email = req.body.email;
            user.age = parseInt(req.body.age);
            user.interest = formatInteres(req.body.interest);
            await user.save();
        } else {
            console.log('O usuário já existe!');
        }
    }
    res.redirect('/');
}