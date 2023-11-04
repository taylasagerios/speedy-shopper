const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../..models');

router.get('/', async (req, res) => {
    try {
        const tags= await Tag.findAll({
            include: [{ 
                model: Product,
             }],
        });
        res.json(tags);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id,{
            include: [{
                 model: Product, 
                },],
        });
        if (!tag) {
            res.status(404).json({ message: 'Tag not available'});
            return;
        }
        res.json(tag);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newTag = await Tag.create(req.body);
        res.status(201).json(newTag);
    } catch (err) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const addedTag = await Tag.update(req.body,{
            where: {
                 id: req.params.id,
                 },
        });
        if (addedTag === 0) {
            res.status(404).json({ message: 'Tag not available'});
            return;
        }
        res.json({message: 'Tag successfully updated'});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTag = await Tag.delete({
            where: {
                 id: req.params.id,
                 },
        });
        if (deletedTag === 0) {
            res.status(400).json({ message: 'Tag not available'});
            return;
        }
        res.json({message: 'Tag successfully deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;