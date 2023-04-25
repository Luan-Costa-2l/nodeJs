import { Request, Response } from "express";
import { pet } from "../models/pet";
import { creteMenuObject } from "../helpers/createMenuObject";

export const search = (req: Request, res: Response) => {
    let query = req.query.q as string;

    if (!query) {
        res.redirect('/');
        return;
    }
    
    let list = pet.getFromName(query);

    res.render('pages/page', {
        menu: creteMenuObject(''),
        banner: undefined,
        list,
        query
    });
}