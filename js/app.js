// menjalankan script setelah seluruh htmlnya selesai di muat 
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput'); //mengambil input
    const searchBtn = document.getElementById('searchBtn'); //mengambil data  dari botton pencarian
    const micBtn = document.getElementById('micBtn'); //mengambil data dari mikrofon pencarian suara

    //memeriksa element
    if (searchInput) {
        searchInput.value = ''; //mengososngkan teks input pencarian setiap kali halaman di muat ulang
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {  // untuk tombol enter
                //untuk  menjalankan fungsi pencarian film jika fungsinya ada
                if (typeof searchMovies === 'function') searchMovies();
            }
        });
    }
    //memeriksa ada tidaknya keberadaan tombol
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (typeof searchMovies === 'function') searchMovies();
        });
    }
    // memeriksa ada tidaknya tombol microfont
    if (micBtn) {
        micBtn.addEventListener('click', () => {
            if (typeof startVoiceSearch === 'function') startVoiceSearch();
        });
    }

    // memeriksa apakah fungsi loadInitialMovies ada
    if (typeof loadInitialMovies === 'function') {
        loadInitialMovies();
    }

    //memeriksa apakah fungsi updateUIstate ada
    if (typeof updateUIState === 'function') {
        updateUIState();
    }
    chips.forEach(chip => {
        // Melakukan iterasi ke setiap elemen chip

        chip.addEventListener('click', (e) => {
            // Menambahkan event handler klik pada setiap chip[cite: 21].

            const category = e.target.getAttribute('data-category');
            // Mengambil nilai atribut data-category dari chip yang diklik[cite: 21].

            if (typeof loadCategory === 'function') {
                // Memeriksa keberadaan fungsi loadCategory

                loadCategory(category, e.target);
                // Memuat film berdasarkan kategori yang diklik
            }
        });
    });
});

    // untuk mengubah mode 
    const themeToggleBtn = document.getElementById('themeToggle');
    // mengambil data atau element ikon pada tombol tema
    const themeIcon = document.getElementById('themeIcon');

    // membaca status tema yang tersimpan di localstorage
    const savedTheme = localStorage.getItem('theme');
    // jika tema tersimpan terang 
    if (savedTheme === 'light') {
        // menambahkan class terang ke elemen body 
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = 'dark_mode';// mengubah ikon menjadi mode gelap
    } else {
        if (themeIcon) themeIcon.textContent = 'light_mode';// mengubah ikon menjadu mode terang
    }

    //mencheck ada tidaknya tombol
    if (themeToggleBtn) {
        //menambahkan fitur klik saat pengguna mengganti tema 
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode'); // menambah dan menghapus mode terang
            // cek apakah mode terang sedang aktif
            const isLight = document.body.classList.contains('light-mode');
            // memperbarui ikon sesuai tema yang sedang di gunakan 
            if (themeIcon) {
                themeIcon.textContent = isLight ? 'dark_mode' : 'light_mode';
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }