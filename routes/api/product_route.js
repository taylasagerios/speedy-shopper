const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../..models');

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category, }],
        });
        res.json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: Category, },
                {
                    model: Tag,
                    through: ProductTag
                }
            ],
        });
        if (!product) {
            res.status(404).json({ message: 'Product not available' });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    Product.create(req.body)
        .then((product) => {
            if (req.body.tagId.lenght) {
                const ProductTagIds = req.body.tagId.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(ProductTagIds);
            }
            res.status(200).json(product);
        })
        .then((ProductTagIds) => res.status(200).json(ProductTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/:id', async (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            if (req.body.tagIds && req.body.tagIds.length) {

                ProductTag.findAll({
                    where: { product_id: req.params.id }
                }).then((productTags) => {
                    const productTagId = productTags.map(({ tag_id }) => tag_id);
                    const newProductTags = req.body.tagIds
                        .filter((tag_id) => !productTagId.includes(tag_id))
                        .map((tag_id) => {
                            return {
                                product_id: req.params.id,
                                tag_id,
                            };
                        });
                    const productTagsToRemove = productTags
                        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                        .map(({ id }) => id);
                    return Promise.all([
                        ProductTag.destroy({ where: { id: productTagsToRemove } }),
                        ProductTag.bulkCreate(newProductTags),
                    ]);
                });
            }
            return res.json(product);
        })
        .catch((err) => {
            res.status(400).json(err);
        });

});


router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.delete({
            where: {
                id: req.params.id,
            },
        });
        if (deletedProduct === 0) {
            res.status(400).json({ message: 'Product not available' });
            return;
        }
        res.json({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;