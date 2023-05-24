import express from 'express';
import mainRoutes from './routes/api';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true}));

app.use(mainRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({error: "EndPoint not found"});
});

app.listen(3000, () => {
    console.log(`Port: http://localhost:3000`);
});