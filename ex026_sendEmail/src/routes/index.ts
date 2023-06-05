import { Router } from "express";
import * as EmailController from '../controllers/emailController';

const router = Router();

router.get('/ping', EmailController.ping);

router.post('/contact', EmailController.contact)

export default router;