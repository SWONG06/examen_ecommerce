const pool = require('../db');

const Product = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (productData) => {
    const { name, description, price, stock, image_url } = productData;
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, stock, image_url]
    );
    return result.rows[0];
  },

  update: async (id, productData) => {
    const { name, description, price, stock, image_url } = productData;
    const result = await pool.query(
      `UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5 WHERE id = $6 RETURNING *`,
      [name, description, price, stock, image_url, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }
};

module.exports = Product;
