// routes/products.js
const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { validateProduct } = require('../middleware/validate');

// GET /api/products — Get all products
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      count: store.products.length,
      data: store.products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/products/category/:cat — Filter by category
router.get('/category/:cat', (req, res) => {
  try {
    const category = req.params.cat.toLowerCase();
    const filtered = store.products.filter(p => p.category.toLowerCase() === category);

    if (filtered.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found in category: ${category}`
      });
    }

    res.status(200).json({
      success: true,
      message: `Products in ${category}`,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/products/:id — Get single product
router.get('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = store.products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product found',
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/products — Add a new product
router.post('/', validateProduct, (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;

    const exists = store.products.find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      return res.status(400).json({
        success: false,
        message: `Product "${name}" already exists!`
      });
    }

    const newProduct = {
      id: store.getNextProductId(),
      name: name.trim(),
      category: category.toLowerCase().trim(),
      price: Number(price),
      stock: Number(stock),
      description: description || ''
    };

    store.products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product added successfully!',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
