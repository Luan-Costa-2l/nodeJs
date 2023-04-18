import express, { Request, Response} from "express";
import mainRoutes from "./routes/mainRoutes";

const app = express();
const port = 3000;

app.use(mainRoutes)

app.use((req: Request, res: Response) => {
    res.send('Page notfound');
});

app.listen(port, () => {
    console.log(`Example app listening on port localhost:${port}`)
});