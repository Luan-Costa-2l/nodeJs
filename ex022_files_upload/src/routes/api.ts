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
// recevi Multiple file types
router.post('/multiple', upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'gallery', maxCount: 3}
]), apiController.multiple);

export default router;