document.addEventListener('DOMContentLoaded', function() {

// Menangani unggahan file saat formulir disubmit
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var productName = this['product-name'].value;
    var productDescription = this['product-description'].value;
    var productImage = URL.createObjectURL(this['product-image'].files[0]);

    // Proses informasi produk sesuai kebutuhan
    // Misalnya, menyimpan informasi produk di penyimpanan lokal atau database
    saveProductLocally(productName, productDescription, productImage);

    // Memperbarui meta tags untuk laman utama
    updateHomePageMetaTags(productName, productDescription, productImage);

    // Memperbarui meta tags untuk laman detail produk
    updateProductDetailMetaTags(productName, productDescription, productImage);

    // Memperbarui daftar produk di halaman utama
    updateProductList();

    // Tampilkan notifikasi bahwa produk baru telah ditambahkan
    alert(`Produk "${productName}" telah ditambahkan dan dapat dilihat di halaman utama.`);

    // Reset form setelah produk ditambahkan
    this.reset();
});

// Fungsi untuk memperbarui meta tags di halaman utama
function updateHomePageMetaTags(name, description, imageUrl) {
    document.querySelector('meta[property="og:title"]').setAttribute('content', name);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', imageUrl);
    // Memperbarui URL jika diperlukan
    // document.querySelector('meta[property="og:url"]').setAttribute('content', productUrl);
}

// Fungsi untuk memperbarui meta tags di halaman detail produk
function updateProductDetailMetaTags(name, description, imageUrl, productUrl) {
    document.querySelector('meta[property="og:title"]').setAttribute('content', name);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', imageUrl);
    document.querySelector('meta[property="og:url"]').setAttribute('content', productUrl);
}

// Fungsi untuk menyimpan data produk di penyimpanan lokal
function saveProductLocally(name, description, imageUrl) {
    var productData = {
        id: Date.now(), // Menggunakan timestamp sebagai id unik
        name: name,
        description: description,
        imageUrl: imageUrl
    };

    // Simpan data produk ke penyimpanan lokal (menggunakan localStorage)
    var products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));
}

// Fungsi untuk menghapus produk dari penyimpanan lokal
function deleteProductLocally(productId) {
    var products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(function(product) {
        return product.id !== productId;
    });
    localStorage.setItem('products', JSON.stringify(products));

    // Hapus tag <meta> untuk produk yang dihapus
    removeMetaTagsForProduct(productId);
}

// Fungsi untuk menghapus tag <meta> untuk produk yang dihapus
function removeMetaTagsForProduct(productId) {
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

// Tangani klik pada tombol logout
document.getElementById('logout-button').addEventListener('click', function() {
    // Hapus status login dari penyimpanan sesi
    sessionStorage.removeItem('isLoggedIn');
    // Redirect pengguna ke halaman login
    window.location.href = 'login.html';
});

});
