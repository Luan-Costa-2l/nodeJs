import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User from '../models/User';

export const home = async (req: Request, res: Response)=>{
    let result = await User.find({ email: 'eduardo@exemple.com'});
    console.log(result)
    if (result.length === 0) {
        // let newUser = await User.create({
        //     name: {
        //         firstName: 'Pedro',
        //         lastName: 'José'
        //     },
        //     age: 18,
        //     email: 'pedro@exemple.com',
        //     interest: ['futebol']
        // });
        // or

        let newUser = new User();
        newUser.name.firstName = 'Eduardo';
        newUser.name.lastName = 'Nunes';
        newUser.age = 18;
        newUser.email = 'eduardo@exemple.com';
        newUser.interest = ['games', 'matemática'];
        let result = await newUser.save();
        console.log(result);
    }
    


    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: []
    });
};