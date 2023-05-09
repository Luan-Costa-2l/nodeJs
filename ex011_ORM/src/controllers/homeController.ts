import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Product } from '../models/Product';
import { User } from '../models/User'

export const home = async (req: Request, res: Response)=>{

    let users = await User.findAll({
        attributes: ['name', ['age', 'idade']],
        where: {
            age: {
                [Op.gte]: 40,
            },
            name: {
                [Op.like]: 'Lu%'
            }
        }
    });
    console.log(users)


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
        users
    });
};