const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product');

/**
 * Endpoint to create a new Product
 * @method POST
 */
router.post('/', ProductController.create);

/**
 * Endpoint to find all Products
 * @method GET
 */
router.get('/', ProductController.findProducts);

/**
 * Endpoint to find all Products
 * @method GET
 */
router.get('/:id', ProductController.findProductById);

/**
 * Endpoint to update a Product
 * @method PUT
 * @param id
 */
router.put('/:id', ProductController.update);

/**
 * Endpoint to delete a Product
 * @method DELETE
 * @param id
 */
router.delete('/:id', ProductController.delete);


module.exports = router;