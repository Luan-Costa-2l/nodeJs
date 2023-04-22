import express from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';
import mainRoutes from './routes';

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({extended: true}));

app.use(mainRoutes);
app.use('*', (req, res) => {
    res.send('Page not found');
});

app.listen(300, () => {
    console.log(`Exemple app listening on port http://localhost:300`);
});