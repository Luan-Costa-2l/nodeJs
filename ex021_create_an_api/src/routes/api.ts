import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

router.post('/sentences', apiController.createSentence); // C
router.get('/sentences', apiController.getSentences); // R
router.get('/sentence/random', apiController.randomSentence);
router.get('/sentence/:id', apiController.getSentence);
router.put('/sentence/:id', apiController.updateSentence) // U
router.delete('/sentence/:id', apiController.deleteSentence); // D

export default router;