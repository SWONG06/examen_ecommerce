const app = require('./app');
const PORT = process.env.PORT || 3000;
const logger = require('./middleware/logger');
const pool = require('./db');



app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
