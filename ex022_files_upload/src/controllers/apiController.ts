import { Request, Response } from "express";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const uploadFile = (req: Request, res: Response) => {
    console.log(req.file)
    res.json({upload: true});
}

export const uploadFiles = (req: Request, res: Response) => {
    console.log('one: ', req.file)
    console.log(req.files)
    res.json({uploads: true});
}