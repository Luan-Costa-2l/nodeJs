import { Request, Response } from "express";
import { creteMenuObject } from '../helpers/createMenuObject';

export const home = (req: Request, res: Response) => {
    res.render('pages/page', {
        menu: creteMenuObject('all'),
        banner: {
            title: 'Todos os animais',
            background: 'allanimals.jpg'
        },
    });
}

export const dogs = (req: Request, res: Response) => {
    res.render('pages/page', {
        menu: creteMenuObject('dog'),
        banner: {
            title: 'Cachorros',
            background: 'banner_dog.jpg'
        },
    });
}

export const cats = (req: Request, res: Response) => {
    res.render('pages/page', {
        menu: creteMenuObject('cat'),
        banner: {
            title: 'Gatos',
            background: 'banner_cat.jpg'
        },
    });
}

export const fishes = (req: Request, res: Response) => {
    res.render('pages/page', {
        menu: creteMenuObject('fish'),
        banner: {
            title: 'Peixes',
            background: 'banner_fish.jpg'
        },
    });
}