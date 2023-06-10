import express, { ErrorRequestHandler } from 'express';
import mainRoutes from './routes/route';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: 'Route not found' });
});

const handlerError: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status);
    } else {
        res.status(400);
    }
    if (err.message) {
        res.json({ error: err.message });
    } else {
        res.json({ error: 'Ocorreu algum erro.'});
    }
}

app.use(handlerError);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});