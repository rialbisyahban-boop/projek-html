// fungsi untuk memunculkan dan menyembunyikan menu profil 
function toggleDropdown() {
    // mengambil menu dropdown 
    const menu = document.getElementById('dropdownMenu');
    if (menu) {
        // mengubah status visibilitasnya 
        menu.classList.toggle('visible');
    }
}

// memperbarui UI sesuai login pengguna 
function updateUIState() {
    const btnLoginNav = document.getElementById('btnLoginNav'); // tombol login
    const userProfileDropdown = document.getElementById('userProfileDropdown'); //mengambil kontainer dropdown user
    const navAvatar = document.getElementById('navAvatar'); //mengambil data ikon atau avatar user

    // jika pengguna terautentikasi
    if (currentUser) {
        //menyembunyikan tombol login
        if (btnLoginNav) btnLoginNav.classList.add('hidden');  
        if (userProfileDropdown) {
            userProfileDropdown.classList.remove('hidden');
            userProfileDropdown.classList.add('visible');
            //menampilkan bagian menu  profile
        }
        // mengisi avatar navigasi dengan inisal huruf pertama
        if (navAvatar) navAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        
        // mengambil elemen nama dan email pada menu dropdown 
        const nameElem = document.getElementById('dropdownUserName');
        const emailElem = document.getElementById('dropdownUserEmail');

        // mengisi element teks nama dengan nama pengguna 
        if (nameElem) nameElem.textContent = currentUser.name;

        // mengisi element teks email dengan email pengguna 
        if (emailElem) emailElem.textContent = currentUser.email;
    } else {
        if (btnLoginNav) {
            btnLoginNav.classList.remove('hidden');
            btnLoginNav.classList.add('inline-block');
            // menampilkan kembali tombol login 
        }
        //menyembunyikan menu dropdown pengguna
        if (userProfileDropdown) btnLoginNav ? userProfileDropdown.classList.add('hidden') : null;
    }

    if (typeof renderAndaTab === 'function') {
        renderAndaTab();
        // merender ulang tampialn halaman anda jika fungsinya ada
    }
}