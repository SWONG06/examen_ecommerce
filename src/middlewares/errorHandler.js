const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.code === 'ER_NO_SUCH_TABLE') {
    return res.status(500).json({ message: 'Database table not found' });
  }
  
  res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;