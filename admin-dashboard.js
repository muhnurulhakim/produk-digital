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

  // Tangani klik pada tombol logout
  document.getElementById('logout-button').addEventListener('click', function() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  });
});

// Fungsi untuk mengunggah gambar ke folder images di repositori GitHub Pages
function uploadImageToGitHubPages(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() {
      var base64Image = reader.result.split(',')[1];

      // fetch('https://api.github.com/repos/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/contents/images/' + file.name, {
      fetch('https://api.github.com/repos/muhnurulhakim/produk-digital/contents/images/' + file.name, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/vnd.github.v3+json',
          'Authorization': 'Bearer "isi kode pat di sini"'
        },
        body: JSON.stringify({
          message: 'Upload gambar produk',
          content: base64Image
        })
      })
      .then(response => response.json())
      .then(data => {
        var imageUrl = data.content.download_url;
        resolve(imageUrl);
      })
      .catch(error => {
        reject(error);
      });
    }
    reader.readAsDataURL(file);
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
