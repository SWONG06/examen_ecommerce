const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().integer().min(0).required(),
  image_url: Joi.string().uri().optional()
});

const validateProduct = (data) => {
  return productSchema.validate(data, { abortEarly: false });
};

module.exports = { validateProduct };