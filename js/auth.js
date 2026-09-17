// menjalankan fungsi setelah elemen dom siap 
document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById('btnLogout'); //tombol log out
    const navAvatar = document.getElementById('navAvatar'); //mengambil element avatar

    if (btnLogout) btnLogout.addEventListener('click', logout); //menghubungkan fitur klik ke fungsi log out
    if (navAvatar) navAvatar.addEventListener('click', toggleDropdown); //menghubungkan fitur klik avatar  ke togglDropdown
});

// untuk log out 
function logout() {
    // mengosongkan data pengguna login 
    currentUser = null;
    //menghapus pengguna dari penyimpanan browser
    localStorage.removeItem('currentUser');
    //mencheck apakah fungsi ada atau tidak
    if (typeof updateUIState === 'function') updateUIState();
    
    // Mengecek apakah halaman saat ini berada di dalam subfolder /html/
    if (window.location.pathname.includes('/html/')) {
        //mengarahkan ke halaman index utama  di luar folder
        window.location.href = '../index.html';
    } else {
        // mengarah ke halaman index.html pada file yang sama 
        window.location.href = 'index.html';
    }
}