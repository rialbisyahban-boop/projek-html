// js/download.js

document.addEventListener('DOMContentLoaded', () => {
    renderDownloads(); //tampilkan data film
});

function renderDownloads() {
    const downloadGrid = document.getElementById('downloadGrid');
    if (!downloadGrid) return;

    while (downloadGrid.firstChild) {
        downloadGrid.removeChild(downloadGrid.firstChild); //bersihkan tampilan
    }

    // Cek Akun Pengguna
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!storedUser || !storedUser.email) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'empty-msg';
        emptyMsg.textContent = 'Silakan login untuk melihat daftar download Anda.';
        downloadGrid.appendChild(emptyMsg); //peringatan kalau belum login
        return;
    }

    // Ambil data download khusus akun aktif
    const userDownloadKey = `downloadedVideos_${storedUser.email}`;
    const downloads = JSON.parse(localStorage.getItem(userDownloadKey)) || [];

    if (downloads.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'empty-msg';
        emptyMsg.textContent = 'Belum ada video yang didownload.';
        downloadGrid.appendChild(emptyMsg);
        return;
    }

    // bikin kartu film offline
    downloads.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'video-card';

        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumbnail-container';
    

        const img = document.createElement('img');
        img.src = movie.backdropUrl || movie.poster_path || '';
        img.alt = movie.title || 'Thumbnail Video';

        const durationSpan = document.createElement('span');
        durationSpan.className = 'duration-tag';
        durationSpan.textContent = movie.duration || '00:00';

        thumbContainer.appendChild(img);
        thumbContainer.appendChild(durationSpan);

        const videoDetails = document.createElement('div');
        videoDetails.className = 'video-details';

        const videoMeta = document.createElement('div');
        videoMeta.className = 'video-meta';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'video-title';
        titleDiv.textContent = movie.title || 'Tanpa Judul';

        const statsDiv = document.createElement('div');
        statsDiv.className = 'video-info-stats';
        statsDiv.textContent = movie.views || 'Tersimpan Offline';

        videoMeta.appendChild(titleDiv);
        videoMeta.appendChild(statsDiv);

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete-download';
        btnDelete.textContent = 'Hapus Download';

        videoDetails.appendChild(videoMeta);
        videoDetails.appendChild(btnDelete);

        card.appendChild(thumbContainer);
        card.appendChild(videoDetails);

        thumbContainer.addEventListener('click', () => playDownloadedMovie(movie.id));
        titleDiv.addEventListener('click', () => playDownloadedMovie(movie.id));

        btnDelete.addEventListener('click', (e) => {
            e.stopPropagation(); //biar nngga ke buka pas tombol hapus di klik
            removeDownload(movie.id, storedUser.email);  // hapus film
        });

        downloadGrid.appendChild(card);
    });
}

// buka film daftar download 
function playDownloadedMovie(id) {
    window.location.href = `../index.html?play=${id}`;
}

function removeDownload(id, userEmail) {
    if (!userEmail) return;
    const userDownloadKey = `downloadedVideos_${userEmail}`;
    let downloads = JSON.parse(localStorage.getItem(userDownloadKey)) || [];
    //buang film yang idnya sesuai
    downloads = downloads.filter(item => String(item.id) !== String(id));
    localStorage.setItem(userDownloadKey, JSON.stringify(downloads));
    renderDownloads(); //refresh download
}