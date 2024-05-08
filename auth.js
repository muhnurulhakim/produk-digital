// Fungsi untuk mendapatkan token akses GitHub dari penyimpanan lokal
function getGitHubAccessToken() {
  return localStorage.getItem('githubAccessToken');
}

// Fungsi untuk menyimpan token akses GitHub di penyimpanan lokal
function setGitHubAccessToken(token) {
  localStorage.setItem('githubAccessToken', token);
}

// Fungsi untuk menghapus token akses GitHub dari penyimpanan lokal
function removeGitHubAccessToken() {
  localStorage.removeItem('githubAccessToken');
}
