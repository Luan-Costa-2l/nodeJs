import { Router } from 'express';
import { home } from '../controlers/homeController';
import { agePage, nameAction, namePage} from '../controlers/userController';

const router = Router();

router.get('/', home);

router.get('/name', namePage);
router.post('/name-result', nameAction);
router.get('/age', agePage);

export default router;