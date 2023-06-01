import { Router } from "express";
import multer from "multer";
import * as apiController from '../controllers/apiController';

// especific configure storage
const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './tmp');
    },
    filename: (req, file, callback) => {
        const randomName = Math.floor(Math.random() * 9999999999);
        callback(null, `${randomName+Date.now()}.jpg`);
    }
});
// salve in memory not in disk. ALERT: it salve in ram memory if the file is big the memory cannot suport
const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: storageConfig,
    // verify file type (optional)
    fileFilter: (req, file, callback) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        callback(null, allowed.includes(file.mimetype));
    },
    // filter/limit by size (optional)
    limits: { fieldSize: 2000000}
});

const router = Router();

router.get('/ping', apiController.ping);

router.post('/upload', upload.single('avatar'), apiController.uploadFile);

export default router;