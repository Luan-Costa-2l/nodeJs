import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {
    let user = {
        name: 'Luan',
        age: 90
    }
    res.render('pages/home', {
        user,
        products: [
            { title: 'Product X', price: 10 },
            { title: 'Product Y', price: 15 },
            { title: 'Product Z', price: 20 },
        ]
    });
}