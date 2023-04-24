import { Request, Response } from "express";
import { creteMenuObject } from '../helpers/createMenuObject';
import { pet } from "../models/pet";

export const home = (req: Request, res: Response) => {
    let list = pet.getAll();

    res.render('pages/page', {
        menu: creteMenuObject('all'),
        banner: {
            title: 'Todos os animais',
            background: 'allanimals.jpg'
        },
        list
    });
}

export const dogs = (req: Request, res: Response) => {
    let list = pet.getFromType('dog');

    res.render('pages/page', {
        menu: creteMenuObject('dog'),
        banner: {
            title: 'Cachorros',
            background: 'banner_dog.jpg'
        },
        list
    });
}

export const cats = (req: Request, res: Response) => {
    let list = pet.getFromType('cat');

    res.render('pages/page', {
        menu: creteMenuObject('cat'),
        banner: {
            title: 'Gatos',
            background: 'banner_cat.jpg'
        },
        list
    });
}

export const fishes = (req: Request, res: Response) => {
    let list = pet.getFromType('fish');

    res.render('pages/page', {
        menu: creteMenuObject('fish'),
        banner: {
            title: 'Peixes',
            background: 'banner_fish.jpg'
        },
        list
    });
}