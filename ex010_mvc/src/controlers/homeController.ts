import { Request, Response } from 'express';

import { Product } from '../models/Product';
export const home = (req: Request, res: Response) => {
    let user = {
        name: 'Luan',
        age: 90
    }

    let list = Product.getAll();
    let expensiveList = Product.getfromPriceAfter(20);
    res.render('pages/home', {
        user,
        products: list,
        expensives: expensiveList,
    });
}