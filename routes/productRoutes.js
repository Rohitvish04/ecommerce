const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products
router.get('/', 
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Get all products'
  productController.getAllProducts
);

// POST /products
router.post('/',
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Create a new product'
  productController.createProduct
);

router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;