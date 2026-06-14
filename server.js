const express = require('express');
const app = express();

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

// Middleware
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🛒 E-Commerce Product API is live!',
    version: '1.0.0',
    endpoints: {
      products: {
        getAllProducts:   'GET  /api/products',
        getSingleProduct: 'GET  /api/products/:id',
        getByCategory:    'GET  /api/products/category/:cat',
        addProduct:       'POST /api/products'
      },
      cart: {
        addToCart:  'POST /api/cart/add',
        viewCart:   'GET  /api/cart/:userId',
        checkout:   'POST /api/cart/checkout'
      }
    }
  });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server!'
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('  🛒 E-Commerce Product API');
  console.log(`  🚀 Running on http://localhost:${PORT}`);
  console.log('');
});
