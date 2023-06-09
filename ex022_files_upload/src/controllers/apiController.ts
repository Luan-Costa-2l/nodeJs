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

export const multiple = (req: Request, res: Response) => {
    type UploadTypes = {
        avatar: Express.Multer.File[];
        gallery: Express.Multer.File[]
    }

    const files = req.files as UploadTypes;

    // console.log('File: ', req.file);

    // console.log('Files: ', req.files);

    console.log('Avatar: ', files.avatar);
    console.log('Gallery', files.gallery);

    res.json({multipleFiles: true});
}