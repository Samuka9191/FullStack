require('dotenv').config();

const express = require('express');

const cors = require('cors');

const produtosRoutes = require('./routes/produtoRoutes.js')

const app = express()

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/api/produtos', produtoRoutes);

app.get('/api/produtoRoutes')

const port = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodandod em http://localhost:${PORT}`);
})