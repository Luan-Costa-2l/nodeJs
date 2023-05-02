import express, { Request, Response} from 'express';
import { homePage, newUser } from '../controllers/homeController';

const router = express.Router();

router.get('/', homePage);

router.post('/newUser', newUser);

export default router;