// routes/cart.js
const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { validateCartItem } = require('../middleware/validate');

// POST /api/cart/add — Add item to cart
router.post('/add', validateCartItem, (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = store.products.find(p => p.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} units of "${product.name}" available in stock`
      });
    }

    if (!store.carts[userId]) {
      store.carts[userId] = [];
    }

    const existingItem = store.carts[userId].find(
      item => item.productId === parseInt(productId)
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      store.carts[userId].push({
        productId: parseInt(productId),
        quantity: Number(quantity)
      });
    }

    res.status(201).json({
      success: true,
      message: `${product.name} added to cart`,
      data: store.carts[userId]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/cart/:userId — View cart with product details and total
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const cart = store.carts[userId];

    if (!cart || cart.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Cart is empty',
        data: [],
        total: 0
      });
    }

    let total = 0;
    const items = cart.map(item => {
      const product = store.products.find(p => p.id === item.productId);
      const subtotal = product ? product.price * item.quantity : 0;
      total += subtotal;

      return {
        productId: item.productId,
        name: product ? product.name : 'Unknown product',
        price: product ? product.price : 0,
        quantity: item.quantity,
        subtotal
      };
    });

    res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: items,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/cart/checkout — Checkout, calculate total and reduce stock
router.post('/checkout', (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      });
    }

    const cart = store.carts[userId];

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty. Add items before checkout.'
      });
    }

    // Validate stock for all items first
    for (const item of cart) {
      const product = store.products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for "${product.name}". Available: ${product.stock}`
        });
      }
    }

    // Deduct stock and calculate total
    let total = 0;
    const purchasedItems = cart.map(item => {
      const product = store.products.find(p => p.id === item.productId);
      product.stock -= item.quantity;
      const subtotal = product.price * item.quantity;
      total += subtotal;

      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal
      };
    });

    // Clear the cart after checkout
    store.carts[userId] = [];

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: {
        userId,
        items: purchasedItems,
        total,
        orderedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
