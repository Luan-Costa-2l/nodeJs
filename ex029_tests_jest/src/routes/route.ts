import { Router } from "express";
import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.get('/list', ApiController.list);

export default router;