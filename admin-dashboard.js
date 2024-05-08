document.addEventListener('DOMContentLoaded', function() {
  // Menangani unggahan file saat formulir disubmit
  document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var productName = this['product-name'].value;
    var productDescription = this['product-description'].value;
    var productImage = URL.createObjectURL(this['product-image'].files[0]);

    // Membuat objek produk baru
    var newProduct = {
      id: Date.now(),
      name: productName,
      description: productDescription,
      imageUrl: productImage
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
