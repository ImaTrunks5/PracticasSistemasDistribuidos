
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 15000 },
  { id: 2, name: 'Mouse', price: 300 },
];


app.get('/products', (req, res) => {
  res.json(products);
});


app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Faltan datos del producto' });
  }

  const newProduct = { id: products.length + 1, name, price: Number(price) };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => console.log(' Servicio de productos corriendo en puerto 3001'));
