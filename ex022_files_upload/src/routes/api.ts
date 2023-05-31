import { Router } from "express";
import multer from "multer";
import * as apiController from '../controllers/apiController';

const upload = multer({dest: './tmp'})

const router = Router();

router.get('/ping', apiController.ping);

router.post('/upload', upload.single('avatar'), apiController.uploadFile);

export default router;