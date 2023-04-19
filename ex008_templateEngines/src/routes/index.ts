import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    let user = {
        name: 'Luan',
        age: 90,
    };
    let showOld = false;

    if (user.age > 50) {
        showOld = true;
    }
    // pegar produtos do banco de dados
    // organizar as informações desses produtos
    // envia para o template engine
    res.render('home', {
        user,
        showWelcome: true,
        showOld,
    });
});

router.get('/news', (req, res) => {
    res.send('A long lis about the news');
});

export default router;