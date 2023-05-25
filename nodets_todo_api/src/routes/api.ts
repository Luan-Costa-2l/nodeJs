import { Router } from "express";
import * as apiController from '../controllers/apiController';

const router = Router();

router.post('/tasks', apiController.createTask);
router.get('/tasks', apiController.getTasks);
router.put('/tasks/:id', apiController.updateTask);
router.delete('/tasks/:id', apiController.deleteTask);

export default router;