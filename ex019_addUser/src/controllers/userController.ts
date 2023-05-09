import { Request, Response } from "express";
import User from "../models/User";

const formatInteres = (string: string) => {
    return string.split(',').map(item => item.trim().toLowerCase());
}

export const newUser = async (req: Request, res: Response) => {
    let query = req.body;
    if (query) {
        let result = await User.findOne({ where: {"name.firstName": query.body.firstName}});

        if (result) {
            let user = new User();

            user.name.firstName = query.body.firstName;
            user.name.lastName = query.body.lastName;
            user.email = query.body.email;
            user.age = parseInt(query.body.age);
            user.interest = formatInteres(query.body.interest);
            await user.save();
        } else {
            console.log('O usuário já existe!');
        }
    }
    res.redirect('/');
}