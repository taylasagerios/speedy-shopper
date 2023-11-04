const sequelize = require('../config/connection');
const seedCategory = require('./category_seeds');
const seedProduct = require('./product_seeds');
const seedProductTag = require('./productTag_seeds');
const seedTag = require('./tag_seeds');

const allSeeds = async () => {
    await sequelize.sync({force: true});
    console.log('DATABASE');
    await seedCategory();
    console.log('Category Seeds');
    await seedProduct();
    console.log('Product Seeds');
    await seedProductTag();
    console.log('ProductTag Seeds');
    await seedTag();
    console.log('Tag Seeds');

    process.exit(0);
};

allSeeds();
