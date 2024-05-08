// Menangani unggahan file saat formulir disubmit
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var productName = this['product-name'].value;
    var productDescription = this['product-description'].value;
    var productImage = this['product-image'].value; // Simpan URL gambar
    // Jika ingin menggunakan fitur unggah ebook, tambahkan kode untuk mengambil URL ebook di sini

    // Proses informasi produk sesuai kebutuhan
    // Misalnya, menyimpan informasi produk di penyimpanan lokal atau database
    saveProductLocally(productName, productDescription, productImage);

    // Memperbarui meta tags untuk laman utama
    updateHomePageMetaTags(productName, productDescription, productImage);

    // Memperbarui meta tags untuk laman detail produk
    updateProductDetailMetaTags(productName, productDescription, productImage);
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
        name: name,
        description: description,
        imageUrl: imageUrl
    };

    // Simpan data produk ke penyimpanan lokal (menggunakan localStorage)
    var products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));
}

// Fungsi untuk menambahkan tag <meta> untuk produk baru
function addMetaTagsForProduct(productName) {
    // Buat elemen <meta> untuk robots dan canonical
    var metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', 'index, follow');

    var metaCanonical = document.createElement('link');
    metaCanonical.setAttribute('rel', 'canonical');
    metaCanonical.setAttribute('href', 'URL_halaman_detail_produk');

    // Tambahkan elemen <meta> ke dalam elemen <head>
    document.head.appendChild(metaRobots);
    document.head.appendChild(metaCanonical);
}

// Tangani klik pada tombol logout
document.getElementById('logout-button').addEventListener('click', function() {
    // Hapus status login dari penyimpanan sesi
    sessionStorage.removeItem('isLoggedIn');
    // Redirect pengguna ke halaman login
    window.location.href = 'login.html';
});

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

// Menangani penghapusan produk saat tombol hapus diklik
document.getElementById('delete-button').addEventListener('click', function() {
    var productNameToDelete = // Ambil nama produk yang akan dihapus dari formulir atau data yang sesuai
    // Hapus produk dari penyimpanan lokal atau database
    deleteProductLocally(productNameToDelete);
    
    // Hapus tag <meta> untuk produk yang dihapus
    removeMetaTagsForProduct(productNameToDelete);
    
    // Lakukan tindakan lain yang diperlukan, misalnya memperbarui tampilan
});
