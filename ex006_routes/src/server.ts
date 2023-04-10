import express, { Request, Response} from 'express';
import mainRoutes from './routes';

const app = express();
const port = 3000;

app.use(mainRoutes);

// // o get é um metodo como post, put e delete
// app.get('/', (req: Request, res: Response) => {
//     res.end('Hello World!');
// });

// // outra forma de fazer
// const Home = (req: Request, res: Response) => {
//     res.end('It\'s a HOME');
// }
// app.get('/home', Home);

// // rota dinâmica
// app.get('/noticia/:slug', (req: Request, res: Response) => {
//     let slug =  req.params.slug
//     res.send(`Notícia: ${slug}`);
// });

// app.get('/voo/:origin-:target', (req: Request, res: Response) => {
//     let {origin, target} = req.params;

//     res.send(`Procurando voos de ${origin.toUpperCase()} para ${target.toUpperCase()}`);
// });

app.listen(port, () => {
    console.log(`Exemple app listen on port http://localhost:${port}`);
});