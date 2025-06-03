const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productSchema = require('../validation/productSchema');
const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validate(productSchema), productController.createProduct);
router.put('/:id', validate(productSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
