require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const mainRoutes = require('./src/routes');


mongoose.connect(process.env.NODE_DATABASE);
// {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.log("Erro: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());
server.use(express.static(path.join(__dirname, './public')));

server.use('/', mainRoutes);

server.listen(process.env.NODE_PORT, () => {
    console.log(`Rodando em ${process.env.NODE_BASE}`);
});