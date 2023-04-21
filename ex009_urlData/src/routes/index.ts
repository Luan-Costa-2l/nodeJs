import { Router, Request, Response } from "express";

const router = Router();

router.get('/', (req, res) => {
    let user = {
        name: 'Luan',
        age: 90
    }
    res.render('pages/home', {
        user
    });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact');
});

router.get('/about', (req, res) => {
    res.render('pages/about');
});

router.get('/name', (req: Request, res: Response) => {
    res.render('pages/name');
});

router.post('/name-result', (req: Request, res: Response) => {
    let user: string = '';
    if(req.body.name) {
        user = req.body.name;
    }
    res.render('pages/name', {
        UserName: user,
    });
});

router.get('/age', (req: Request, res: Response) => {
    // req pega info
    let showAge = false;
    const idade = () => {
        if (req.query.year) {
            let UserYear = parseInt(req.query.year as string);
            let currentDate = new Date().getFullYear();
            showAge = true;
            return currentDate - UserYear;
        }
    }
    // res manda info
    res.render('pages/age', {
        age: idade(),
        showAge
    });
});

export default router;