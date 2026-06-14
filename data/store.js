let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 1999,
    stock: 25,
    description: "Bluetooth over-ear headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "footwear",
    price: 2499,
    stock: 15,
    description: "Lightweight running shoes with cushioned sole"
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "electronics",
    price: 3499,
    stock: 10,
    description: "Fitness tracker with heart rate monitor"
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    category: "clothing",
    price: 499,
    stock: 50,
    description: "100% cotton round neck t-shirt"
  },
  {
    id: 5,
    name: "Backpack",
    category: "accessories",
    price: 1299,
    stock: 20,
    description: "Water-resistant laptop backpack with multiple compartments"
  }
];

let carts = {};

let nextProductId = 6;

module.exports = {
  products,
  carts,
  getNextProductId: () => nextProductId++
};
