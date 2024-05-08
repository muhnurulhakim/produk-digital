// Ambil data produk dari penyimpanan lokal dan tampilkan di halaman utama
function displayProducts() {
    var products = JSON.parse(localStorage.getItem('products')) || [];

    var productListContainer = document.getElementById('product-list');

    productListContainer.innerHTML = '';

    products.forEach(function(product) {
        var productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <a href="product-detail.html" class="buy-button">Product Details</a>
        `;
        productListContainer.appendChild(productCard);
    });
}

// Panggil fungsi untuk menampilkan produk saat halaman dimuat
displayProducts();

// Menangani klik pada tombol "Product Details"
document.getElementById('product-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('buy-button')) {
        // Dapatkan judul produk yang diklik
        var productName = event.target.parentElement.querySelector('h2').textContent;

        // Simpan judul produk yang diklik ke penyimpanan sesi
        sessionStorage.setItem('selectedProduct', productName);
    }
});

// Fungsi untuk memperbarui tag <meta> untuk halaman utama
function updateHomePageMetaTags(productName, productDescription, productImage) {
    // Ambil elemen <meta> untuk robots dan canonical
    var metaRobots = document.querySelector('meta[name="robots"]');
    var metaCanonical = document.querySelector('link[rel="canonical"]');

    // Perbarui konten tag <meta> sesuai dengan informasi produk baru
    if (metaRobots && metaCanonical) {
        metaRobots.setAttribute('content', 'index, follow');
        metaCanonical.setAttribute('href', 'URL_halaman_detail_produk');
    }
}

// Fungsi untuk menghapus tag <meta> untuk produk yang dihapus
function removeMetaTagsForProduct(productName) {
    // Dapatkan elemen <meta> untuk robots dan canonical
    var metaRobots = document.querySelector('meta[name="robots"]');
    var metaCanonical = document.querySelector('link[rel="canonical"]');

    // Periksa apakah elemen <meta> ada sebelum dihapus
    if (metaRobots && metaCanonical) {
        // Hapus elemen <meta> dari elemen <head>
        metaRobots.remove();
        metaCanonical.remove();
    }
}
