import express, { Request, Response} from 'express';
import { homePage, newUser, updateUser } from '../controllers/homeController';

const router = express.Router();

router.get('/', homePage);

router.post('/newUser', newUser);
router.post('/updateUser', updateUser);

export default router;