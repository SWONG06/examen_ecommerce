// controllers/imageService.js
const axios = require('axios');

const getRandomImage = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  const products = response.data;
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  return randomProduct.image;
};

module.exports = { getRandomImage };
