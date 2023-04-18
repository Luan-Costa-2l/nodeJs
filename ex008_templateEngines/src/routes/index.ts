import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    // pegar produtos do banco de dados
    // organizar as informações desses produtos
    // envia para o template engine
    res.render('home');
});

router.get('/news', (req, res) => {
    res.send('A long lis about the news');
});

export default router;