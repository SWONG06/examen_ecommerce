const express = require('express');
const pool = require('./config/db'); // Asegúrate que esta ruta es correcta

const app = express();

// Prueba de conexión a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar con PostgreSQL:', err);
  } else {
    console.log('Conexión exitosa a PostgreSQL. Hora actual:', res.rows[0].now);
  }
});

// Resto de tu configuración del servidor...