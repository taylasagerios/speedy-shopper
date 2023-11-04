const Category = require('./category');
const Product = require('./product');
const Tag = require('./tag');
const ProductTag = require('./productTag');

Product.belongsTo(Category, {
    forgeinKey: 'category_id',
    onDelete: 'CASCADE',
});

Category.hasMaany(Product, {
    forgeinKey: 'category_id',
});

Product.belongsToMany(Tag, {
    forgeinKey: 'tag_id',
});

Tag.belongsToMany(Product, {
    forgeinKey: 'tag_id',
});

module.exports = {
    Category,
    Product,
    Tag,
    ProductTag
};