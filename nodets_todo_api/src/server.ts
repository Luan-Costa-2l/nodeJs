import express from 'express';
import mainRoutes from './routes/api';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true}));

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: "Route not found" });
});

app.listen(3000, () => {
    console.log('Port: http://localhost:3000');
});