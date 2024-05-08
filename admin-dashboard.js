document.addEventListener('DOMContentLoaded', function() {
  // Menangani unggahan file saat formulir disubmit
document.getElementById('product-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var productName = this['product-name'].value;
  var productDescription = this['product-description'].value;
  var productImageFile = this['product-image'].files[0];

  // Upload gambar produk ke folder images di repositori GitHub Pages
  uploadImageToGitHubPages(productImageFile)
    .then(function(imageUrl) {
      // Membuat objek produk baru dengan URL gambar
      var newProduct = {
        id: Date.now(),
        name: productName,
        description: productDescription,
        imageUrl: imageUrl
      };

      // Mengirimkan permintaan PUT ke file products.json di repositori GitHub Pages
      fetch('products.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([...getExistingProducts(), newProduct])
      })
      .then(response => {
        if (response.ok) {
          alert(`Produk "${productName}" telah ditambahkan dan dapat dilihat di halaman utama.`);
          this.reset();
        } else {
          alert('Terjadi kesalahan saat menambahkan produk baru.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambahkan produk baru.');
      });
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengunggah gambar produk.');
    });
});

// Fungsi untuk mengunggah gambar ke folder images di repositori GitHub Pages
function uploadImageToGitHubPages(file) {
  // Implementasi logika untuk mengunggah gambar ke repositori GitHub Pages
  // Misalnya, menggunakan GitHub API atau GitHub Desktop
  // Setelah berhasil mengunggah, kembalikan URL gambar yang telah diunggah
  return new Promise(function(resolve, reject) {
    // Contoh sederhana mengembalikan URL gambar
    // resolve(`https://your-github-pages-url.com/images/${file.name}`); --> default code
    resolve(`https://raw.githubusercontent.com/muhnurulhakim/produk-digital/main/images/${file.name}`);
  });
}

    // Fungsi untuk mendapatkan produk yang sudah ada dari file products.json
    function getExistingProducts() {
      return fetch('products.json')
        .then(response => response.json())
        .catch(error => {
          console.error('Error:', error);
          return [];
        });
    }
  });

  // Tangani klik pada tombol logout
  document.getElementById('logout-button').addEventListener('click', function() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  });
});
