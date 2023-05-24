import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

router.get('/sentences', apiController.getSentences);
router.get('/sentence/:id', apiController.getSentence);
router.post('/sentences', apiController.createSentence);

export default router;