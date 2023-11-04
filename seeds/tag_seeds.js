const { Tag } = require('../models');

const tagInfo = [
    {
       name: 'Blue'
    },
    {
        name: 'Red'
     },
     {
        name: 'Black'
     },
     {
        name: 'Butterfly'
     },
     {
        name: 'Star'
     },
     {
        name: 'Heart'
     },
    
];

const seedTag = () => Category.bulkCreate(tagInfo);

module.exports = seedTag;