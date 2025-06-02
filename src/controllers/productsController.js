const Product = require('../models/Product');
const ExternalApiService = require('../../services/externalApiService');
const { validateProduct } = require('../validations/productValidation');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    // Obtener imagen de API externa
    const imageUrl = await ExternalApiService.getRandomProductImage();
    
    const productData = {
      ...req.body,
      image_url: imageUrl
    };

    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    const updatedProduct = await Product.update(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await Product.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
