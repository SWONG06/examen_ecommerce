const pool = require('../config/db');

class Product {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ name, description, price, stock, image_url }) {
    const query = `
      INSERT INTO products (name, description, price, stock, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [name, description, price, stock, image_url];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async update(id, { name, description, price, stock, image_url }) {
    const query = `
      UPDATE products 
      SET name = $1, description = $2, price = $3, stock = $4, image_url = $5 
      WHERE id = $6
      RETURNING *`;
    const values = [name, description, price, stock, image_url, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return true;
  }
}

module.exports = Product;
