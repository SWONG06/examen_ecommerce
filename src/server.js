const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api/products', productRoutes);

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Conexión exitosa', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ message: 'Error de conexión', error: error.message });
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
