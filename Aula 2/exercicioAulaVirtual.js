let products = require('./products');

// Adicione um novo produto ao array com as mesmas propriedades dos produtos existentes.

products.push({
    name: 'Macbook case',
    price: 60,
    quantity: 25,
    colors: ['pink', 'silver']
});

console.log(products);

// Remova os produtos fora de estoque da matriz.

while (products.findIndex(product => product.quantity == 0) != -1) {
    products.splice(products.findIndex(product => product.quantity == 0), 1);
}

console.log(products);

// Imprima no console a soma do estoque de todos os produtos.

const somaEstoque = products.reduce((acc, {quantity}) => {
    return acc + quantity;
}, 0)

console.log(somaEstoque);

// Imprima produtos com preço superior a um determinado valor.

function filterUpper(priceInput) {
    return products.filter(({price}) => price >= priceInput);
}

console.log(filterUpper(200));

// Imprima o nome de todos os produtos que tenham a letra 'o' em seu nome.

const letraO = products.filter(({name}) => name.includes('o'));

console.log(letraO);