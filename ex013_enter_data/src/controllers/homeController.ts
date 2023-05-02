import { Request, Response } from "express";
import { User } from '../models/User';

export const homePage = async (req: Request, res: Response) => {
    // build + save
    const user = User.build({
        name: 'Beltrano',
    }); // salva na memória

    let age: number = 12;
    user.age = age;

    await user.save() // salva e manda pro servidor

    // create
    // const user = await User.create({
    //     name: 'Ciclaninho'
    // });

    res.render('pages/home', {
    });
}