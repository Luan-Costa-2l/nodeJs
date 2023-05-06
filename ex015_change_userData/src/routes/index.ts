import express from 'express';
import { deleteUser, homePage, lessAge, sumAge } from '../controllers/homeController';

const router = express.Router();

router.get('/', homePage);

router.get('/user/:id/sum', sumAge);
router.get('/user/:id/less', lessAge);
router.get('/user/:id/delete', deleteUser);

export default router;