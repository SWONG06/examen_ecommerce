// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Configuración para PostgreSQL en Render (usa SSL en producción)
const pool = new Pool({
  user: process.env.DB_USER || 'ecommerce_db_94zz_user',
  host: process.env.DB_HOST || 'dpg-d0uvklu3jp1c73dkha39-a.oregon-postgres.render.com',
  database: process.env.DB_NAME || 'ecommerce_db_94zz',
  password: process.env.DB_PASSWORD || '5n84a4trRB8RhZD858WbKeVMMuTxBrrjb',
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // Necesario para Render
    sslmode: 'require'
  }
});

// Verificación de conexión (opcional pero recomendado)
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar a PostgreSQL:', err.stack);
  } else {
    console.log('Conexión exitosa a PostgreSQL');
    release();
  }
});

module.exports = { pool }; // Exporta como objeto para mayor flexibilidad