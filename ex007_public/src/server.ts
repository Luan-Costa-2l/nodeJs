import express, { Request, Response} from "express";
import path from 'path';
import mainRoutes from "./routes/mainRoutes";

const app = express();
const port = 3000;

console.log();

// tornei a pasta acessivel via url
app.use(express.static(path.join(__dirname, '../public')));

app.use(mainRoutes)

app.use((req: Request, res: Response) => {
    res.send('Page notfound');
});

app.listen(port, () => {
    console.log(`Example app listening on port localhost:${port}`)
});