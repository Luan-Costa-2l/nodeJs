import { Router } from "express";

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.get('/random', (req, res) => {
    let random = Math.floor(Math.random() * 10.99);
    res.json({ random });
});

router.get('/name/:name', (req, res) => {
    let name = req.params.name;
    res.json({ name });
});

export default router;