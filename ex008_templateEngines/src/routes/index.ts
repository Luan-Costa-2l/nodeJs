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
    res.render('pages/home', {
        user,
        showWelcome: true,
        showOld,
        products: [
            {title: 'Produto X', price: 10},
            {title: 'Produto Y', price: 15},
            {title: 'Produto Z', price: 20},
        ],
        sentences: [
            'Frase 1',
            'Frase 2',
            'Frase 3',
        ]
    });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact');
});

router.get('/about', (req, res) => {
    res.render('pages/about');
});

export default router;