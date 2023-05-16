import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://resttesttest.com',
    methods: ['get']
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true}));

app.use('/api', apiRoutes);

app.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'EndPoint não encontrado.'});
});

app.listen(process.env.PORT, () => {
    console.log(`acesse em: http://localhost:${process.env.PORT}`);
});