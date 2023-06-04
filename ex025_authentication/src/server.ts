import Express from "express";
import path from "path";
import mainRoutes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = Express();

app.use(cors());
app.use(Express.static(path.join(__dirname, 'public')));
app.use(Express.urlencoded({extended: true}));

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: 'Invalid route.' });
});

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
})