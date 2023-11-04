const { Product } = require('../models');

const productInfo = [
    {
        name: 'Black Shirt',
        price: 16,
        stock: 15,
        category_id:1
    },
    {
        name: 'Blue Jeans',
        price: 14,
        stock: 17,
        category_id:3
    },
    {
        name: 'Nike AirForces',
        price: 20,
        stock: 12,
        category_id:5
    },
    {
        name: 'Bucket Hat',
        price: 12,
        stock: 10,
        category_id:7
    },
    {
        name: 'Butterfly Clip',
        price: 4,
        stock: 18,
        category_id:9
    },
    
];

const seedProduct = () => Category.bulkCreate(productInfo);

module.exports = seedProduct;