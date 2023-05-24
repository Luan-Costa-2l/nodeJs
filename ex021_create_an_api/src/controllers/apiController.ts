import { Request, Response } from 'express';
import { Sentence } from '../models/Sentence';

export const getSentences = async (req: Request, res: Response) => {
    const response = await Sentence.findAll();
    res.json(response);
}

export const getSentence = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (id) {
        const response = await Sentence.findOne({
            where: {
                id
            },
        });

        if (!response) {
            res.json({ error: "NotFound" })
        }
        res.json(response);
    }
}

export const createSentence = async (req: Request, res: Response) => {
    console.log(req.body)

    const { author, txt } = req.body;

    // let errors = ''

    // if(!author) {
    //     errors += 'Invalid author';
    // }
    // if(!txt) {
    //     errors += ' Invalid txt';
    // }
    // if(errors) {
    //     res.json(errors);
    // }

    const newSentence = await Sentence.create({ author, txt });
    res.status(201);
    res.json({ id: newSentence.id, author, txt });
}

export const updateSentence = async (req: Request, res: Response) => {
    const { txt } = req.body;
    const id = req.params.id;

    const sentence = await Sentence.findByPk(id);

    if (!sentence) {
        res.status(404);
        res.json({ error: "Sentence not found" });
    } else {
        sentence.txt = txt;
        await sentence.save();

        res.status(200);
        res.json(sentence);
    }
}