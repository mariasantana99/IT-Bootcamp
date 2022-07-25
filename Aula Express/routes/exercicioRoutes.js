const express = require('express');
const routes = express.Router();
const produtos = require('../../Aula 2/products');

routes.use(express.json());

let estoque = produtos;

// 1. Retornar todos os produtos da array. “/api/products”

routes.get('/', (req, res) => {
    res.status(200).json(estoque);
});

// 2. Obter um produto específico pelo ID “/api/products/:id”

routes.get('/:id', (req, res) => {
    const { id } = req.params;
    const produto = estoque.find(item => item.id === Number(id));

    if (!produto) {
        return res.status(404).json({ "message": 'O item não foi encontrado' });
    }

    res.status(200).json(produto);
});

// 3. Adicionar um novo produto “/api/products”

routes.post('/', (req, res) => {
    const content = req.body;

    estoque.push(content);

    res.status(200).json('Produtos inseridos com sucesso!');
});

// 4. Mudar uma propriedade do produto (qualquer uma) “/api/products/:id”

routes.patch('/:id', (req, res) => {
    let { id } = req.params;
    let body = req.body;

    if (!estoque.find(item => item.id === Number(id))) {
        return res.status(404).json({"message": "O produto com a id desejada não existe."});
    }

    for (let b in req.body) {
        const produto = estoque.find(item => item.id === Number(id));
        produto[b] = body[b];
        res.status(200).json({"message": "Produto atualizado com sucesso!"});
    }
});

// 5. Deletar um produto utilizando o ID “/api/products/:id”.

routes.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!estoque.find(item => item.id === Number(id))) {
        return res.status(404).json({"message": "O produto com a id desejada não existe."});
    }

    const attEstoque = estoque.filter(produto => produto.id !== Number(id));

    estoque = attEstoque;

    res.status(200).json({"message": "Produto apagado com sucesso!"});
});

module.exports = routes;