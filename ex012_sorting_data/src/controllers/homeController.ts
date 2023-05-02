import { Request, Response } from "express";
import { User } from '../models/User';
import { Op } from "sequelize";

export const homePage = async (req: Request, res: Response) => {
    let users = await User.findAll({
        where: {
            age: {
                [Op.gte]: 18
            }
        },
        order: [
            ['age', 'ASC']
        ],
        offset: 2, // pula n itens
        limit: 2
    });

    res.render('pages/home', {
        users
    });
}