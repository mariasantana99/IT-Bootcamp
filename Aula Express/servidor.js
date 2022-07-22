const express = require('express');
const app = express();
const produtos = require('../Aula 2/products');

app.use(express.json());

let estoque = produtos;

for (let i = 0; i < estoque.length; i++) {
    estoque[i].id = i+1;
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/products', (req, res) => {
    res.status(200).json(estoque);
});

app.post('/products', (req, res) => {
    const content = req.body;

    if (typeof content !== 'object' || content.length !== 4) {
        res.status(400).json({"message": "Por favor, insira quatro produtos."});
    };
    
    content.forEach(produto => estoque.push(produto));

    res.status(200).json('Produtos inseridos com sucesso!');
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const content = req.body;

    if (!estoque.find(item => item.id === Number(id))) {
        return res.status(404).json({"message": "O produto com a id desejada não existe."});
    }

    const attEstoque = estoque.map(produto => produto.id === Number(id) ? content : produto);

    estoque = attEstoque;

    res.status(200).json({"message": "Produto atualizado com sucesso!"});
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    if (!estoque.find(item => item.id === Number(id))) {
        return res.status(404).json({"message": "O produto com a id desejada não existe."});
    }

    const attEstoque = estoque.filter(produto => produto.id !== Number(id));

    estoque = attEstoque;

    res.status(200).json({"message": "Produto apagado com sucesso!"});
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});