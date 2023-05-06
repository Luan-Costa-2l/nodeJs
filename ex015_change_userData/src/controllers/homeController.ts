import { Request, Response } from "express";
import { User } from "../models/User";

export const homePage = async (req: Request, res: Response) => {
    let users = await User.findAll();
    const [user, created] = await User.findOrCreate({
        where: {name: 'Jobs'},
        defaults: {
            age: 2023
        }
    });
    if (created) {
        console.log('Usuário criado!');
    } else {
        console.log('O usuário já existe');
    }
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