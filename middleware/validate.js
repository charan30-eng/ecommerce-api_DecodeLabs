// middleware/validate.js

const validateProduct = (req, res, next) => {
  const { name, category, price, stock } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Product name is required');
  }

  if (!category || category.trim() === '') {
    errors.push('Category is required');
  }

  if (price === undefined || isNaN(price) || price <= 0) {
    errors.push('Price must be a positive number');
  }

  if (stock === undefined || isNaN(stock) || stock < 0) {
    errors.push('Stock must be a number 0 or greater');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateCartItem = (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  const errors = [];

  if (!userId || userId.toString().trim() === '') {
    errors.push('userId is required');
  }

  if (!productId) {
    errors.push('productId is required');
  }

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    errors.push('Quantity must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = { validateProduct, validateCartItem };
