document.addEventListener('DOMContentLoaded', () => {
    renderAndaTab();

    const btnSwitchRegister = document.getElementById('inlineSwitchToRegister');
    const btnSwitchLogin = document.getElementById('inlineSwitchToLogin');
    const loginBox = document.getElementById('inlineLoginFormContainer');
    const registerBox = document.getElementById('inlineRegisterFormContainer');

    if (btnSwitchRegister && btnSwitchLogin) {
        btnSwitchRegister.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginBox) loginBox.classList.add('display');
            if (registerBox) registerBox.classList.remove('display');
        });

        btnSwitchLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (registerBox) registerBox.classList.add('display');
            if (loginBox) loginBox.classList.remove('display');
        });
    }

    // untuk login 
    const inlineLoginForm = document.getElementById('inlineLoginForm');
    if (inlineLoginForm) {
        inlineLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('inlineLoginEmail').value;
            const name = email.split('@')[0]; //mengambil nama depan dari email

            currentUser = { name, email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser)); //menyimpan data  login
            if (typeof updateUIState === 'function') updateUIState();
            renderAndaTab();
        });
    }

    // untuk pendaftaran
    const inlineRegisterForm = document.getElementById('inlineRegisterForm');
    if (inlineRegisterForm) {
        inlineRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('inlineRegisterName').value;
            const email = document.getElementById('inlineRegisterEmail').value;

            currentUser = { name, email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));// simpan data pendaftaran
            if (typeof updateUIState === 'function') updateUIState();
            renderAndaTab();
        });
    }
});

// tampilan untuk tamu 
function renderAndaTab() {
    const guestView = document.getElementById('andaGuestView');
    const userView = document.getElementById('andaUserView');
    if (!guestView || !userView) return;

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser) {
        guestView.classList.add('display');
        guestView.classList.remove('visible');//sembunyikan  form tamu

        userView.classList.remove('display');
        userView.classList.add('visible');//tampilkan form penggunanya

        const profileName = document.getElementById('profilePageName');
        const profileEmail = document.getElementById('profilePageEmail');
        const profileAvatar = document.getElementById('profilePageAvatar');

        if (profileName) profileName.textContent = storedUser.name;
        if (profileEmail) profileEmail.textContent = `@${storedUser.email.split('@')[0]} • Lihat channel Anda`;
        if (profileAvatar) profileAvatar.textContent = storedUser.name.charAt(0).toUpperCase();

        renderHistory(); //menampilkan history
    } else {
        guestView.classList.remove('display');
        guestView.classList.add('visible');// tampilkan form tamu 

        userView.classList.add('display');
        userView.classList.remove('visible');
    }
}

function renderHistory() {
    const historyGrid = document.getElementById('historyGrid');
    if (!historyGrid) return;

    while (historyGrid.firstChild) {
        historyGrid.removeChild(historyGrid.firstChild); // bersihkan history lama
    }

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!storedUser || !storedUser.email) return;

    const userHistoryKey = `watchHistory_${storedUser.email}`;
    const historyList = JSON.parse(localStorage.getItem(userHistoryKey)) || []; // ambil data riwayat tontonan

    if (historyList.length === 0) {
        const p = document.createElement('p');
        p.className = 'empty-msg';
        p.textContent = 'Belum ada video yang ditonton.'; // jika riwayat kosong
        historyGrid.appendChild(p);
        return;
    }

    // untuk data film dibuat setiap histori 
    historyList.forEach(item => {
        const movieId = item.movie ? (item.movie.id || item.id) : item.id;
        const titleText = item.movie ? (item.movie.title || item.title) : (item.title || 'Tanpa Judul');

        const card = document.createElement('div');
        card.className = 'video-card';

        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumbnail-container clickable';

        const img = document.createElement('img');
        img.src = item.backdropUrl || (item.movie ? item.movie.backdropUrl : '');
        img.alt = titleText;
        img.onerror = () => { img.src = typeof NO_POSTER !== 'undefined' ? NO_POSTER : ''; };

        const durationSpan = document.createElement('span');
        durationSpan.className = 'duration-tag';
        durationSpan.textContent = item.duration || '00:00';

        thumbContainer.appendChild(img);
        thumbContainer.appendChild(durationSpan);

        const videoDetails = document.createElement('div');
        videoDetails.className = 'video-details';

        const videoMeta = document.createElement('div');
        videoMeta.className = 'video-meta';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'video-title clickable';
        titleDiv.textContent = titleText;

        const statsDiv = document.createElement('div');
        statsDiv.className = 'video-info-stats';
        statsDiv.textContent = item.views || 'Tersimpan';

        videoMeta.appendChild(titleDiv);
        videoMeta.appendChild(statsDiv);
        videoDetails.appendChild(videoMeta);

        card.appendChild(thumbContainer);
        card.appendChild(videoDetails);

        // kartu riwayat kalau di klik buka film nya di halaman utama 
        const handlePlayHistory = () => {
            if (movieId) {
                window.location.href = `../index.html?play=${movieId}`;
            } else {
                window.location.href = '../index.html';
            }
        };

        thumbContainer.addEventListener('click', handlePlayHistory);
        titleDiv.addEventListener('click', handlePlayHistory);

        historyGrid.appendChild(card);
    });
}