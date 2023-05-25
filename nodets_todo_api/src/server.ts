import express from 'express';
import mainRoutes from './routes/api';

const app = express();

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({ error: "Route not found" });
});

app.listen(3000, () => {
    console.log('Port: http://localhost:3000');
});