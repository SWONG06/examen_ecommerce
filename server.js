const app = require('./app');
const { pool } = require('./config/db');

const PORT = process.env.PORT || 3000;

// Verificación de conexión a la DB al iniciar
pool.query('SELECT NOW()')
  .then(() => {
    console.log('✅ PostgreSQL conectado');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de conexión a PostgreSQL:', err);
    process.exit(1);
  });