const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().precision(2).required(),
  stock: Joi.number().integer().required(),
});

module.exports = productSchema;
