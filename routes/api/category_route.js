const router = require('express').Router();
const { Category, Product } = require('../..models');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{ model: Product, }],
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id,{
            include: [{ model: Product, },],
        });
        if (!category) {
            res.status(404).json({ message: 'Category not available'});
            return;
        }
        res.json(category);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(404).json({ message: 'Unable to add category'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const newRow = await Category.update(req.body,{
            where: {
                 id: req.params.id,
                 },
        });
        if (newRow === 0) {
            res.status(404).json({ message: 'Category not available'});
            return;
        }
        res.json({message: 'Category successfully updated'});
    } catch (error) {
        res.status(404).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCatergory = await Category.delete({
            where: {
                 id: req.params.id,
                 },
        });
        if (deletedCatergory === 0) {
            res.status(400).json({ message: 'Category not available'});
            return;
        }
        res.json({message: 'Category successfully deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;