# E-Commerce Product API

A RESTful backend API for managing products and a shopping cart, built with Node.js and Express.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![REST API](https://img.shields.io/badge/REST-API-blue?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## Overview

This API simulates the core backend of an e-commerce platform — browsing products, adding items to a cart, and checking out. It includes stock management, input validation, and proper HTTP status codes.

---

## Getting Started

### Prerequisites
- Node.js v18 or above
- npm

### Installation

```bash
git clone https://github.com/charan30/ecommerce-product-api.git
cd ecommerce-product-api
npm install
npm run dev
```

The server starts at `http://localhost:3000`

---

## API Reference

### Base URL
```
http://localhost:3000/api
```

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Get all products |
| `GET` | `/products/:id` | Get a single product |
| `GET` | `/products/category/:cat` | Get products by category |
| `POST` | `/products` | Add a new product |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/cart/add` | Add an item to the cart |
| `GET` | `/cart/:userId` | View cart with total |
| `POST` | `/cart/checkout` | Checkout and place order |

---

## Request & Response Examples

### Add Product

```http
POST /api/products
Content-Type: application/json

{
  "name": "Bluetooth Speaker",
  "category": "electronics",
  "price": 1499,
  "stock": 30,
  "description": "Portable speaker with 12-hour battery life"
}
```

```json
{
  "success": true,
  "message": "Product added successfully!",
  "data": {
    "id": 6,
    "name": "Bluetooth Speaker",
    "category": "electronics",
    "price": 1499,
    "stock": 30,
    "description": "Portable speaker with 12-hour battery life"
  }
}
```

### Add to Cart

```http
POST /api/cart/add
Content-Type: application/json

{
  "userId": "user123",
  "productId": 1,
  "quantity": 2
}
```

### View Cart

```http
GET /api/cart/user123
```

```json
{
  "success": true,
  "message": "Cart fetched successfully",
  "data": [
    {
      "productId": 1,
      "name": "Wireless Headphones",
      "price": 1999,
      "quantity": 2,
      "subtotal": 3998
    }
  ],
  "total": 3998
}
```

### Checkout

```http
POST /api/cart/checkout
Content-Type: application/json

{
  "userId": "user123"
}
```

On success, stock is reduced for each purchased item and the cart is cleared.

---

## HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| `200` | OK — Request successful |
| `201` | Created — Resource created / order placed |
| `400` | Bad Request — Validation failed, duplicate product, or insufficient stock |
| `404` | Not Found — Resource does not exist |
| `500` | Internal Server Error — Something went wrong on the server |

---

## Project Structure

```
ecommerce-product-api/
├── data/
│   └── store.js          # In-memory products and carts
├── middleware/
│   └── validate.js        # Request validation
├── routes/
│   ├── products.js        # Product endpoints
│   └── cart.js            # Cart and checkout endpoints
├── server.js              # Application entry point
├── test.http               # API test file (VS Code REST Client)
└── package.json
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| Nodemon | Development auto-restart |

---

## Testing

This project includes a `test.http` file for testing all endpoints directly inside VS Code using the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension.

Open `test.http` and click **Send Request** above any endpoint.

---

## License

This project is licensed under the MIT License.
