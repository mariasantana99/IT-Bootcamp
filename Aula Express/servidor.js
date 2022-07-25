const express = require('express');
const app = express();

const rotaProduto = require('./routes/produtos');
const exercicioRouter = require('./routes/exercicioRoutes');
const exercicioUsers = require('./routes/users');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Exercício em aula:
app.use('/products', rotaProduto);
// Exercício integrador:
app.use('/api/products', exercicioRouter);
// Exercício assíncrono:
app.use('/api/users', exercicioUsers);

// Middleware para rotas não encontradas

app.use((req, res, next) => {
    res.status(404).send('Not Found');

    next();
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});