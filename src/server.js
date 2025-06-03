const express = require('express');
const pool = require('./db'); // Asegúrate que tienes este archivo con la conexión a PostgreSQL
const app = express();
const logger = require('./middleware/logger');

app.use(express.json());

// Listar productos
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo productos' });
  }
});

// Obtener producto por id
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo producto' });
  }
});

// Crear producto
app.post('/api/products', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [name, description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creando producto' });
  }
});

// Actualizar producto
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, description, price, id]
    );
    if (result.rowCount === 0) { // Cambié result.rows.length a result.rowCount
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando producto' });
  }
});

// Eliminar producto (versión corregida)
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  // Validación básica del ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // Devuelve el producto eliminado (opcional)
    res.json({ 
      message: 'Producto eliminado correctamente',
      deletedProduct: result.rows[0] 
    });
    
  } catch (error) {
    console.error('Error en DELETE /api/products:', error);
    res.status(500).json({ 
      error: 'Error eliminando producto',
      details: error.message // Solo para desarrollo, quitar en producción
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
