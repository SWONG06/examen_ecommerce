const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger); // Middleware de logging

// Rutas
app.use('/api/products', require('./routes/productsRoutes'));

// Manejo de errores (debe ser el último middleware)
app.use(require('./middlewares/errorHandler'));

module.exports = app;