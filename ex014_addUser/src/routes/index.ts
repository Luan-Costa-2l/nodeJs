import express, { Request, Response} from 'express';
import { deleteUser, homePage, newUser, updateUser } from '../controllers/homeController';

const router = express.Router();

router.get('/', homePage);

router.post('/newUser', newUser);
router.post('/updateUser', updateUser);
router.post('/deleteUser', deleteUser);

export default router;