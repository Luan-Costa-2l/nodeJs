import express from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';
import dotenv from 'dotenv';
import mainRoutes from './routes';

dotenv.config();

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({extended: true}));

app.use(mainRoutes);
app.use('*', (req, res) => {
    res.send('Page not found');
});

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
    console.log(`Exemple app listening on port http://localhost:4000`);
});