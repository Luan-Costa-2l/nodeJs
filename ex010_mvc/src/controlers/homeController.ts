import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {
    let user = {
        name: 'Luan',
        age: 90
    }
    res.render('pages/home', {
        user,
    });
}