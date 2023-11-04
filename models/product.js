const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');


class Product extends Model { }

Product.init(
    {
        id: {
            type: DataTypes.INTERGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDecimal: true,
            }
        },
        stock: {
            type: DataTypes.INTERGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                isNumeric: true,
            }
        },
        category_id: {
            type: DataTypes.INTERGER,
            allowNull: true,
            references: {
                model: 'category',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = Product;