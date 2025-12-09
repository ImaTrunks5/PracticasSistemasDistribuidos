
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();


app.use(cors());

app.use(express.json());

let reviews = [
  { id: 1, productId: 1,  comment: 'Excelente laptop', rating: 5 },
  { id: 2, productId: 2, comment: 'Buen mouse por el precio', rating: 4 },
];


app.get('/reviews', (req, res) => {
  res.json(reviews);
});


app.get('/reviews/with-products', async (req, res) => {
  try {
    const { data: products } = await axios.get('http://localhost:3001/products');
    const combined = reviews.map(r => ({
      ...r,
      product: products.find(p => p.id === r.productId),
    }));
    res.json(combined);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo productos', error: error.message });
  }
});

app.get('/reviews/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const productReviews = reviews.filter(r => r.productId === productId);
  res.json(productReviews);
});

app.post('/reviews', (req, res) => {
  let { productId, comment, rating } = req.body;
  if (!productId || !comment || !rating) {
      return res.status(400).json({ message: 'Faltan datos en la reseña' });
    }
    productId = parseInt(productId);
    rating = parseInt(rating);

  const newReview = {
    id: reviews.length + 1,
    productId,
    comment,
    rating,
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(3002, () => console.log('Servicio de reseñas corriendo en puerto 3002'));
