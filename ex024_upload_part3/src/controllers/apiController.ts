import { unlink } from "fs/promises";
import { Request, Response } from "express";
import sharp from "sharp";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const uploadFile = async (req: Request, res: Response) => {
    if (req.file) {
        const fileName = req.file.filename;
        await sharp(req.file.path)
            .resize(300, 300, {position: 'right'})
            .toFormat('jpeg')
            .toFile(`./public/midia/${fileName}`);

        await unlink(req.file.path)

        res.json({image: `${fileName}`});
    } else {
        res.status(400);
        res.json({error: 'Invalid file!'})
    }
}