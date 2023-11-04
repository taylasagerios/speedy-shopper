const { Category } = require('../models');

const categoryInfo = [
    {
        name: 'Tops'
    },
    {
        name: 'Bottoms'
    },
    {
        name: 'Shoes'
    },
    {
        name: 'Hats'
    },
    {
        name: 'Accessories'
    },
];

const seedCategory = () => Category.bulkCreate(categoryInfo);

module.exports = seedCategory;