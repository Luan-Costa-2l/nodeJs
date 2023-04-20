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
    // req pega info
    let UserName: string = req.query.name as string;
    // res manda info
    res.render('pages/name', {
        UserName,
    });
});

router.get('/age', (req: Request, res: Response) => {
    let showAge = false;
    const idade = () => {
        if (req.query.year) {
            let UserYear = parseInt(req.query.year as string);
            let currentDate = new Date().getFullYear();
            showAge = true;
            return currentDate - UserYear;
        }
    }
    res.render('pages/age', {
        age: idade(),
        showAge
    });
});

export default router;