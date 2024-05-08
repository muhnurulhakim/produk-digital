document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = this['email'].value;
    var password = this['password'].value;

    // Periksa apakah email dan password sesuai dengan yang telah ditentukan
    if (email === 'muina@duck.com' && password === '?1$1&;):$2&ghqhgahajabh') {
        // Jika sesuai, arahkan pengguna ke halaman admin dashboard
        window.location.href = 'admin-dashboard.html';
    } else {
        // Jika tidak sesuai, tampilkan pesan error atau lakukan tindakan lain sesuai kebutuhan
        alert('Email atau password salah. Silakan coba lagi.');
    }
});

// Periksa apakah email dan password sesuai dengan yang telah ditentukan
if (email === 'muina@duck.com' && password === '?1$1&;):$2&ghqhgahajabh') {
    // Simpan status login di penyimpanan sesi
    sessionStorage.setItem('isLoggedIn', 'true');

    // Jika sesuai, arahkan pengguna ke halaman admin dashboard
    window.location.href = 'admin-dashboard.html';
}

