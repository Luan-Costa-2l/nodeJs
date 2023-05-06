import { Request, Response } from "express";
import { User } from "../models/User";

export const homePage = async (req: Request, res: Response) => {
    let users = await User.findAll();
    await User.findOrCreate({
        where: {name: 'Julia'},
        defaults: {
            age: 14
        }
    })
    res.render('pages/home', {
        users
    });
}

export const sumAge = async (req: Request, res: Response) => {
    let { id } = req.params;
    let user = await User.findOne({where: {id}});
    if (user) {
        user.age++;
        user.save();
    }
    res.redirect('/');
}

export const lessAge = async (req: Request, res: Response) => {
    let { id } = req.params;
    let user = await User.findByPk(id);
    if (user) {
        user.age = user.age - 1;
        user.save();
    }
    res.redirect('/');
}

export const deleteUser = async (req: Request, res: Response) => {
    let { id } = req.params;
    await User.destroy({where: {id}});
    res.redirect('/');
}