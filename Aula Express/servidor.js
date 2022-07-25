const express = require('express');
const app = express();

const rotaProduto = require('./routes/produtos');
const exercicioRouter = require('./routes/exercicioRoutes');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/products', rotaProduto);

app.use('/api/products', exercicioRouter);

// Middleware para rotas não encontradas

app.use((req, res, next) => {
    res.status(404).send('Not Found');

    next();
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});