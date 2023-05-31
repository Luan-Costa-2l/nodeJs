import { Request, Response } from "express";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const uploadFile = (req: Request, res: Response) => {
    console.log('file: ', req.file)
    res.json({upload: true});
}