const express = require('express');
const routes = express.Router();
const produtos = require('../../Aula 2/products');

let estoque = produtos;

for (let i = 0; i < estoque.length; i++) {
    estoque[i].id = i+1;
};

routes.use(express.json());

routes.get('/', (req, res) => {
    res.status(200).json(estoque);
});

function validatePrice (req, res, next) {
    const {price} = req.body;
    
    if (price && price >= 0) {
        next();
    }
    
    return res.status(400).json({ error: 'Price is required' });
};

routes.post('/', validatePrice, (req, res) => {
    const content = req.body;

    if (typeof content !== 'object' || content.length !== 4) {
        res.status(400).json({"message": "Por favor, insira quatro produtos."});
    };
    
    content.forEach(produto => estoque.push(produto));

    res.status(200).json('Produtos inseridos com sucesso!');
});

routes.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const content = req.body;

    if (!estoque.find(item => item.id === Number(id))) {
        return res.status(404).json({"message": "O produto com a id desejada não existe."});
    }

    const attEstoque = estoque.map(produto => produto.id === Number(id) ? content : produto);

    estoque = attEstoque;

    res.status(200).json({"message": "Produto atualizado com sucesso!"});
});

routes.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    if (!estoque.find(item => item.id === Number(id))) {
        return res.status(404).json({"message": "O produto com a id desejada não existe."});
    }

    const attEstoque = estoque.filter(produto => produto.id !== Number(id));

    estoque = attEstoque;

    res.status(200).json({"message": "Produto apagado com sucesso!"});
});

module.exports = routes;