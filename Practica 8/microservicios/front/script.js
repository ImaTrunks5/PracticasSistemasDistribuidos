const PRODUCT_URL = 'https://micro-productos-923500210820.us-south1.run.app/products';
const REVIEW_URL = 'https://micro-reviews-923500210820.us-south1.run.app/reviews';

async function loadProducts() {
  const res = await fetch(PRODUCT_URL);
  const products = await res.json();

  const container = document.getElementById('products');
  container.innerHTML = '';

  for (const p of products) {
    const resReviews = await fetch(`${REVIEW_URL}/${p.id}`);
    const reviews = await resReviews.json();

    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.id}. ${p.name} - $${p.price}</h3>
      <ul>
        ${reviews.length ? reviews.map(r => `<li>${r.comment} (${r.rating}/5)</li>`).join('') : '<li>Sin reseñas</li>'}
      </ul>
    `;
    container.appendChild(div);
  }
}

async function addProduct() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;

  const res = await fetch(PRODUCT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  });

  if (res.ok) {
    alert('Producto agregado!');
    loadProducts();
  } else {
    alert('Error al agregar producto');
  }
}

async function addReview() {
  const productId = document.getElementById('productId').value;
  const comment = document.getElementById('comment').value;
  const rating = document.getElementById('rating').value;

  const res = await fetch(REVIEW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, comment, rating })
  });

  if (res.ok) {
    alert('Reseña agregada!');
    loadProducts();
  } else {
    alert('Error al agregar reseña');
  }
}

loadProducts();
