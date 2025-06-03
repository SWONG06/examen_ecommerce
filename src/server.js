const express = require('express');
require('dotenv').config();
const pool = require('./db');
const logger = require('./middleware/logger');
app.use(logger);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Conexión exitosa. Hora en BD: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send('Error consultando la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
