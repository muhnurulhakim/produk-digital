const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const email = this.email.value;
  const password = this.password.value;

  // Check login credentials
  if (email === 'muina@duck.com' && password === '007') {
    // Simpan status login di penyimpanan sesi
    sessionStorage.setItem('isLoggedIn', 'true');

    // Prompt pengguna untuk memasukkan token akses GitHub
    var githubAccessToken = prompt('Masukkan Token Akses GitHub Anda:');
    setGitHubAccessToken(githubAccessToken);

    // Redirect ke halaman admin dashboard
    window.location.href = 'admin-dashboard.html';
  } else {
    alert('Email atau password salah. Silakan coba lagi.');
  }
});
