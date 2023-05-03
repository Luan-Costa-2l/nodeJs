import { Request, Response } from "express";
import { User } from '../models/User';

export const homePage = async (req: Request, res: Response) => {
    // let results = await User.findAll({ where: { id: 71 }});
    // if (results) {
    //     let user = results[0];
    //     user.name = 'Trem';
    //     await user.save();
    // }

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

export const updateUser = async (req: Request, res: Response) => {
    let { name, age, id } = req.body;
    if (name || age) {
        await User.update({ name }, {
            where: {
                id
            }
        })
    }

    res.redirect('/');
}