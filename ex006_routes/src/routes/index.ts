import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Olá, eu sou o início');
});

router.get('/noticia/:slug', (req: Request, res: Response) => {
    res.send('uma notícia qualquer');
});

router.get('/voo/:origin-:target', (req: Request, res: Response) => {
    res.send('Uma viagem para algum lugar');
});

export default router;