// Untuk menampung video yang sedang diputar 
let currentPlayingMovie = null;

document.addEventListener('DOMContentLoaded', () => {
    const btnDownload = document.getElementById('downloadPlayerBtn');

    // Mengambil data dari tombol download 
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            if (currentPlayingMovie) {
                saveToDownloads(currentPlayingMovie);
            } else {
                saveToDownloads(null);
            }
        });
    }

    // Mengambil parameter dari URL halaman
    const urlParams = new URLSearchParams(window.location.search);
    const playId = urlParams.get('play');

    if (playId) {
        fetchMovieAndPlay(playId);
    }
});

// Untuk menampilkan notifikasi
function showDownloadToast(message, type = 'warning') {
    let toast = document.getElementById('downloadToast');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'downloadToast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `visible toast-${type}`;

    setTimeout(() => {
        toast.className = 'hidden';
    }, 5000);
}

// Simpan download 
function saveToDownloads(movieData) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!storedUser || !storedUser.email) {
        showDownloadToast('Silakan login', 'error');
        return;
    }

    if (!movieData) {
        showDownloadToast('Tidak ada video yang diputar', 'error');
        return;
    }

    const movieToSave = {
        id: String(movieData.id || Date.now()),
        title: movieData.title || movieData.name || 'Tanpa Judul',
        backdropUrl: movieData.backdropUrl || (movieData.backdrop_path ? `${BACKDROP_BASE_URL}${movieData.backdrop_path}` : NO_POSTER),
        duration: movieData.duration || '12:34',
        views: movieData.views || 'Tersimpan Offline'
    };

    const userDownloadKey = `downloadedVideos_${storedUser.email}`;
    let downloads = JSON.parse(localStorage.getItem(userDownloadKey)) || [];
    const isExist = downloads.some(item => String(item.id) === movieToSave.id);

    if (!isExist) {
        downloads.push(movieToSave);
        localStorage.setItem(userDownloadKey, JSON.stringify(downloads));
        showDownloadToast('Berhasil Download!', 'success');
    } else {
        showDownloadToast('Video sudah Download.', 'warning');
    }
}

// Menyimpan riwayat tontonan (Perbaikan: typo parameter 'vews' diganti 'views')
function addToHistory(movie, backdropUrl, views, duration) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!storedUser || !storedUser.email) return;
    if (!movie) return;

    const userHistoryKey = `watchHistory_${storedUser.email}`;
    let historyList = JSON.parse(localStorage.getItem(userHistoryKey)) || [];

    // Menghapus data duplikat
    historyList = historyList.filter(item => item.movie && item.movie.id !== movie.id);

    // Membuat riwayat baru di posisi paling awal
    historyList.unshift({
        movie: movie,
        backdropUrl: backdropUrl,
        views: views,
        duration: duration,
        timestamp: new Date().getTime()
    });

    localStorage.setItem(userHistoryKey, JSON.stringify(historyList));
}

// Memuat film di beranda 
async function loadInitialMovies() {
    const randomPage = Math.floor(Math.random() * 5) + 1;
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=id-ID&page=${randomPage}&include_adult=false`;
    fetchAndRenderMovies(url);
}

// Untuk input pencarian
async function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    const query = searchInput.value.trim();

    if (!query) {
        loadInitialMovies();
        return;
    }

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=id-ID&include_adult=false`;
    fetchAndRenderMovies(url);
}

// Pemfilteran pencarian
function isSafeContent(movie) {
    if (movie.adult === true) return false;

    const lowerTitle = (movie.title || '').toLowerCase();
    const lowerOverview = (movie.overview || '').toLowerCase();
    const lowerPoster = (movie.poster_path || '').toLowerCase();
    const lowerBackdrop = (movie.backdrop_path || '').toLowerCase();

    const blockedKeywords = ['xx','porn', 'erotic', 'sex', 'hentai', 'adult', 'bokep', 'nsfw', 'sensual', 'nudity', 'nude', '18+'];

    const containsBadText = blockedKeywords.some(word => lowerTitle.includes(word) || lowerOverview.includes(word));
    const containsBadImage = blockedKeywords.some(word => lowerPoster.includes(word) || lowerBackdrop.includes(word));

    return !containsBadText && !containsBadImage;
}

// Fungsi pembantu untuk membersihkan child element 
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Menampilkan element card video 
async function fetchAndRenderMovies(url) {
    const movieGrid = document.getElementById('movieGrid');
    const statusMessage = document.getElementById('statusMessage');

    if (!movieGrid) return;

    if (statusMessage) {
        statusMessage.classList.remove('hidden');
        statusMessage.classList.add('visible');
        statusMessage.textContent = 'Memuat video...';
    }

    // Menggunakan fungsi pembersih DOM murni
    clearElement(movieGrid);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const safeMovies = data.results.filter(isSafeContent);

            if (safeMovies.length === 0) {
                if (statusMessage) statusMessage.textContent = 'Konten tidak ditemukan';
                return;
            }

            if (statusMessage) {
                statusMessage.classList.add('hidden');
                statusMessage.classList.remove('visible');
            }

            for (const movie of safeMovies) {
                const backdropUrl = movie.backdrop_path ? `${BACKDROP_BASE_URL}${movie.backdrop_path}` : (movie.poster_path ? `${BACKDROP_BASE_URL}${movie.poster_path}` : NO_POSTER);
                const randomViews = (Math.floor(Math.random() * 900) + 10) + ' rb x ditonton';
                const randomTime = (Math.floor(Math.random() * 5) + 1) + ' tahun yang lalu';
                const fakeDuration = (Math.floor(Math.random() * 90) + 10) + ':' + (Math.floor(Math.random() * 50) + 10);

                const card = createVideoCard(movie, backdropUrl, randomViews, randomTime, fakeDuration);
                movieGrid.appendChild(card);
            }
        } else {
            if (statusMessage) statusMessage.textContent = 'Tidak ditemukan!';
        }
    } catch (error) {
        console.error('Error Beranda:', error);
        if (statusMessage) statusMessage.textContent = 'Gagal mengambil data';
    }
}

// Membentuk elemen DOM kartu film (Perbaikan Event Handler & Deklarasi Variabel Ganda)
function createVideoCard(movie, backdropUrl, views, time, duration) {
    const card = document.createElement('div');
    card.className = 'video-card';

    // Handler klik terpusat
    const handlePlay = () => {
        currentPlayingMovie = {
            id: movie.id,
            title: movie.title,
            backdropUrl: backdropUrl,
            duration: duration,
            views: views
        };

        addToHistory(movie, backdropUrl, views, duration);

        // Update URL di browser tanpa me-reload halaman
        const newUrl = `${window.location.pathname}?play=${movie.id}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        if (typeof window.playMovieTrailer === 'function') {
            window.playMovieTrailer(movie.id, movie.title);
        }
    };

    // Container Thumbnail
    const thumbContainer = document.createElement('div');
    thumbContainer.className = 'thumbnail-container clickable';
    thumbContainer.addEventListener('click', handlePlay);

    const img = document.createElement('img');
    img.src = backdropUrl;
    img.alt = movie.title || '';
    img.onerror = () => { img.src = NO_POSTER; };

    const durationSpan = document.createElement('span');
    durationSpan.className = 'duration-tag';
    durationSpan.textContent = duration;

    thumbContainer.appendChild(img);
    thumbContainer.appendChild(durationSpan);

    // Detail Video
    const videoDetails = document.createElement('div');
    videoDetails.className = 'video-details';

    const channelAvatar = document.createElement('img');
    channelAvatar.className = 'channel-avatar';
    channelAvatar.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${movie.id}`;
    channelAvatar.alt = 'avatar';

    const videoMeta = document.createElement('div');
    videoMeta.className = 'video-meta';

    // Judul
    const titleDiv = document.createElement('div');
    titleDiv.className = 'video-title clickable';
    titleDiv.textContent = movie.title || '';
    titleDiv.addEventListener('click', handlePlay);

    // Statistik
    const statsDiv = document.createElement('div');
    statsDiv.className = 'video-info-stats';
    statsDiv.textContent = `${views} • ${time}`;

    // Tombol Download Cepat
    const btnQuickDownload = document.createElement('button');
    btnQuickDownload.className = 'btn-quick-download';

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.textContent = 'download';

    const textBtn = document.createTextNode('Download');
    btnQuickDownload.appendChild(icon);
    btnQuickDownload.appendChild(textBtn);

    btnQuickDownload.addEventListener('click', (e) => {
        e.stopPropagation();
        saveToDownloads({
            id: movie.id,
            title: movie.title,
            backdropUrl: backdropUrl,
            duration: duration,
            views: views
        });
    });

    videoMeta.appendChild(titleDiv);
    videoMeta.appendChild(statsDiv);
    videoMeta.appendChild(btnQuickDownload);

    videoDetails.appendChild(channelAvatar);
    videoDetails.appendChild(videoMeta);

    card.appendChild(thumbContainer);
    card.appendChild(videoDetails);

    return card;
}

// Mengambil detail film 
async function fetchMovieAndPlay(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=id-ID`);
        if (!response.ok) return;
        const movie = await response.json();

        const backdropUrl = movie.backdrop_path ? `${BACKDROP_BASE_URL}${movie.backdrop_path}` : NO_POSTER;
        currentPlayingMovie = {
            id: movie.id,
            title: movie.title,
            backdropUrl: backdropUrl,
            duration: '12:34',
            views: 'Tersimpan Offline'
        };

        if (typeof window.playMovieTrailer === 'function') {
            window.playMovieTrailer(movie.id, movie.title);
        }
    } catch (err) {
        console.error('Gagal memuat detail video', err);
    }
}