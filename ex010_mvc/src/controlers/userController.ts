import { Request, Response } from 'express';

export const namePage = (req: Request, res: Response) => {
    res.render('pages/name');
}

export const nameAction = (req: Request, res: Response) => {
    let user: string = '';
    if  (req.body.name) {
        user = req.body.name;
    }
    res.render('pages/name', {
        userName: user,
    });
}

export const agePage = (req: Request, res: Response) => {
    let showAge = false;
    const idade = () => {
        if (req.query.year) {
            let userYear = parseInt(req.query.year as string);
            let currentYear = new Date().getFullYear();
            showAge = true;
            return currentYear - userYear;
        }
    }
    res.render('pages/age', {
        age: idade(),
    });
}