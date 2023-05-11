import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User, { UserType } from '../models/User';

export const home = async (req: Request, res: Response)=>{
    let result = await User.find({ email: 'eduardo@exemple.com'});
    if (result.length === 0) {
        let newUser = new User();
        newUser.name.firstName = 'Eduardo';
        newUser.name.lastName = 'Nunes';
        newUser.age = 18;
        newUser.email = 'eduardo@exemple.com';
        newUser.interest = ['games', 'matemática'];
        await newUser.save();
    }

    let users = await User.find({});
    



    let list = Product.getAll();

    res.render('pages/home', {
        name: 'Luan',
        lastName: 'Costa',
        products: list,
        users
    });
};

export const updateUser = async (req: Request, res: Response) => {
    let user = await User.where({"name.firstName": req.body.firstName}).findOne();
    if (user) {
        user.name.firstName = req.body.newFirstName;
        await user.save();
    } else {
        console.log('Nome inválido');
    }
    res.redirect('/');
};

export const deleteUser = async (req: Request, res: Response) => {
    let name = req.body.firstName;
    await User.deleteOne({"name.firstName": name});
    res.redirect('/');
}

export const incrementAge = async (req: Request, res: Response) => {
    let userId = req.params.id;
    let user = await User.findById(userId);
    if (user) {
        await user.updateOne({age: user.age + 1});
    } else {
        console.log('Usuário não existe');
    }
    res.redirect('/');
}