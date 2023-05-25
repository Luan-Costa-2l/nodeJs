import { Router } from "express";
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.get('/ping', (req, res) => {
    res.json({pong: true});
});


export default router;