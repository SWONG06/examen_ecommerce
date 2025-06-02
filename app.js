require('dotenv').config();
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use(logger); // Aquí debe ser una función
app.use('/api/products', productRoutes);
app.use(errorHandler); // También debe ser función

module.exports = app;
