const express = require('express');
const app = express();
const produtos = require('../Aula 2/products');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/products', (req, res) => {
    res.status(200).json(produtos);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    
    const produto = produtos.find(produto => produto.id === Number(id));

    res.status(200).json(produto);
});

app.post('/products', (req, res) => {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});