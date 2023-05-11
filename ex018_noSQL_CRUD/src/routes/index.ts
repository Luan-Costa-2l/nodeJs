import { Router } from 'express';

import * as HomeController from '../controllers/homeController';

const router = Router();

router.get('/', HomeController.home);
router.post('/updateUser', HomeController.updateUser);
router.post('/deleteUser', HomeController.deleteUser);
router.get('/user/:id/addage', HomeController.incrementAge);

export default router;