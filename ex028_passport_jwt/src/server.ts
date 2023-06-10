import express, { ErrorRequestHandler } from "express";
import mainRoutes from './routes/routes';
import dotenv from 'dotenv';
import path from "path";
import cors from 'cors';
import passport from 'passport';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status);
    } else {
        res.status(400);
    }
    if (err.message) {
        res.json({ error: err.message });
    } else {
        res.json({ error: 'Ocorreu algum erro.' })
    }
}

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});