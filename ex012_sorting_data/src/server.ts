import express from 'express';
import mustache from 'mustache-express';
import path from 'path';
import router from './routes'

const app = express();
const port = 3000;

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, '/views'));

app.use(router);

app.use('*', (req, res) => {
    res.send('Page notfound');
});

app.listen(port, () => {
    console.log(`acesse em: http://localhost:${port}`);
});