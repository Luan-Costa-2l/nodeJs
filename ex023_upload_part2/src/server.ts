import express, { ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';
import mainRoutes from './routes/api';
import cors from 'cors'
import path from 'path';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true}));

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // bad request

    if (err instanceof MulterError) {
        res.json({error: err.code});
    } else {
        console.log(err)
        res.json({erro: 'Ocorreu um Erro desconhecido, verifique o console.'});
    }
}
app.use(errorHandler)

app.listen(3000, () => {
    console.log('Port: http://localhost:3000');
});