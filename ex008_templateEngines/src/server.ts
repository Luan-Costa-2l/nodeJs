import express, { Request, Response} from 'express';
import path from 'path';
import mustache from 'mustache-express';
import router from './routes';


const app = express();

app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, './views'));
app.engine('mustache', mustache());

app.use(router);

app.listen(80, () => {
    console.log('access in http://localhost');
});