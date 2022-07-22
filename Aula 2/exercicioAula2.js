let products = require('./products');

// Adicione um ID exclusivo a cada produto começando com 1.

for (let i = 0; i < products.length; i++) {
    products[i].ID = i+1;
};

// Imprima o nome de cada um dos produtos no console.

products.forEach(({name}) => console.log(name));

// Imprima no console o produto com o id 3.

console.log(products.find(product => product.ID == 3));

// Imprima no console os produtos com a cor 'black'.

console.log(products.filter(({colors}) => colors.includes('black')));

// Imprima no console os produtos que não possuem cor.

console.log(products.filter(({colors}) => colors.length == 0));