const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1RgRzClwN8F4op0qEbzQDVR2ZqxPAKX9Sb4oc4X4oRgRJ_68FwPPBHP-XsF-Asf1sphz_q0vmtTX0/pub?gid=0&single=true&output=csv';

const productsContainer = document.querySelector('#products .row');

async function fetchProducts() {
  const response = await fetch(spreadsheetUrl);
  const data = await response.text();
  const products = Papa.parse(data, { header: true }).data;
  return products;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = product['Product Image'];
  img.alt = product['Product Name'];
  card.appendChild(img);

  const h2 = document.createElement('h2');
  h2.textContent = product['Product Name'];
  card.appendChild(h2);

  const p = document.createElement('p');
  p.textContent = `$${product['Price']}`;
  card.appendChild(p);

  const button = document.createElement('button');
  button.textContent = 'Add to Cart';
  card.appendChild(button);

  return card;
}

async function renderProducts() {
  const products = await fetchProducts();
  products.forEach(product => {
    const card = createProductCard(product);
    productsContainer.appendChild(card);
  });
}

renderProducts();
