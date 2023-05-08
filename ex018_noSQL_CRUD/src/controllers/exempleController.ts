import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User from '../models/User';

export const home = async (req: Request, res: Response)=>{
    let result = await User.find({ email: 'pedro@exemple.com'});
    console.log(result)
    if (result.length === 0) {
        let newUser = await User.create({
            name: {
                firstName: 'Pedro',
                lastName: 'José'
            },
            age: 18,
            email: 'pedro@exemple.com',
            interest: ['futebol']
        });
        console.log(newUser);
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        products: list,
        expensives: expensiveList,
        frasesDoDia: []
    });
};