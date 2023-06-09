import { Router } from "express";
import * as ApiController from '../controllers/apiController';
import { privateRoute } from "../config/passport";

const router = Router();

router.get('/ping', async (req, res) => {
    res.json({ pong: true });
});

router.post('/login', privateRoute, ApiController.login);
router.get('/list', privateRoute, ApiController.list);


export default router;