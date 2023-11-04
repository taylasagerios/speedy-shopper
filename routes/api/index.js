const router = require('express').Router();
const categoryRoute = requier('./category-routes');
const productRoute = requier('./product-routes');
const tagRoute = requier('./tag-routes');

router.use('/categories', categoryRoute);
router.use('/products', productRoute);
router.use('/tag', tagRoute);

module.exports = router