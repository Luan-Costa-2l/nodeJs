import express from 'express';
import mainRoutes from './routes/api';

const app = express();

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: "Route not found" });
})