import express from 'express';
import mustache from 'mustache-express';
import path from 'path';
import mainRoutes from './routes'

const app = express();

app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, './views'));
app.engine('mustache', mustache());

app.use(mainRoutes);
app.get('*', (req, res) => {
    res.send('page not found');
});

app.listen(80, () => {
    console.log('access in http://localhost/');
});