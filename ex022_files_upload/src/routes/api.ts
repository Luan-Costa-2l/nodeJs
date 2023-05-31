import { Router } from "express";
import multer from "multer";
import * as apiController from '../controllers/apiController';

const upload = multer({dest: './tmp'})

const router = Router();

router.get('/ping', apiController.ping);

// recive one file
router.post('/upload', upload.single('avatar'), apiController.uploadFile);
// recive files with a limit
router.post('/uploads', upload.array('avatars', 2), apiController.uploadFiles);

export default router;