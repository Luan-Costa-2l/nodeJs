import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hi, i\'m a home');
});

router.get('/noticia/:slug', (req, res) => {
    res.send(`A news about ${req.params.slug}`);
});

export default router;