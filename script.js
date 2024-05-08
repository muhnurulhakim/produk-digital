// Ambil data produk dari file products.json di repositori GitHub Pages
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    displayProducts(data);
  })
  .catch(error => console.error('Error:', error));

function displayProducts(products) {
  var productListContainer = document.getElementById('product-list');
  productListContainer.innerHTML = '';

  products.forEach(function(product) {
    var productCard = document.createElement('div');
    productCard.classList.add('product');
    productCard.setAttribute('id', 'product-' + product.id);
    productCard.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <a href="product-detail.html?id=${product.id}" class="buy-button">Product Details</a>
    `;
    productListContainer.appendChild(productCard);
  });
}

// Menangani klik pada tombol "Product Details"
document.getElementById('product-list').addEventListener('click', function(event) {
  if (event.target.classList.contains('buy-button')) {
    var productId = event.target.parentElement.getAttribute('id').split('-')[1];
    sessionStorage.setItem('selectedProductId', productId);
  }
});

// Fungsi untuk memperbarui tag <meta> untuk halaman utama
function updateHomePageMetaTags(productName, productDescription, productImage) {
  var metaRobots = document.querySelector('meta[name="robots"]');
  var metaCanonical = document.querySelector('link[rel="canonical"]');

  if (metaRobots && metaCanonical) {
    metaRobots.setAttribute('content', 'index, follow');
    metaCanonical.setAttribute('href', 'URL_halaman_detail_produk');
  }
}
