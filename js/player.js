// Fungsi pembantu jika belum ada di file lain
if (typeof clearElement !== 'function') {
    function clearElement(element) {
        if (element) element.textContent = '';
    }
}

// Untuk menampilkan trailer film 
window.playMovieTrailer = async function (movieId, movieTitle) {
    // Mengambil data element 
    const playerSection = document.getElementById('inlinePlayerSection');
    const playerContainer = document.getElementById('inlinePlayerContainer');
    const playingTitle = document.getElementById('playingTitle');

    if (!playerSection || !playerContainer) {
        console.error('Element inlinePlayerSection atau inlinePlayerContainer tidak ditemukan di HTML!');
        return;
    }

    // Menampilkan element player 
    playerSection.classList.remove('hidden');
    playerSection.classList.add('visible');

    // Mengisi teks judul video 
    if (playingTitle) playingTitle.textContent = movieTitle || 'Memutar Video';

    // Mengosongkan pemutar dari sisa iframe sebelumnya
    clearElement(playerContainer);

    // Menampilkan pesan memuat
    const loadingMsg = document.createElement('p');
    loadingMsg.className = 'empty-msg';
    loadingMsg.textContent = 'Memuat video trailer...';
    playerContainer.appendChild(loadingMsg);

    // Scroll halus ke pemutar video
    playerSection.scrollIntoView({ behavior: 'smooth' });

    try {
        // Mengambil data dari API
        const apiUrl = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Cari video trailer dari YouTube (dengan fallback ke video YT mana saja)
        const trailer = data.results ? (
            data.results.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
            data.results.find(v => v.site === 'YouTube')
        ) : null;

        clearElement(playerContainer);

        // Jika key ditemukan
        if (trailer && trailer.key) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
            iframe.className = 'player-iframe';
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');

            // Memasang elemen iframe  
            playerContainer.appendChild(iframe);
        } else {
            // Jika trailer tidak ditemukan
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = 'Trailer tidak tersedia untuk video ini.';
            playerContainer.appendChild(errorMsg);
        }
    } catch (err) {
        console.error('Error Player:', err);
        clearElement(playerContainer);
        const errorMsg = document.createElement('p');
        errorMsg.className = 'error-msg';
        errorMsg.textContent = 'Gagal terhubung ke API video.';
        playerContainer.appendChild(errorMsg);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const closePlayerBtn = document.getElementById('closePlayerBtn');
    const playerSection = document.getElementById('inlinePlayerSection');
    const playerContainer = document.getElementById('inlinePlayerContainer');

    if (closePlayerBtn) {
        // Untuk tombol close player 
        closePlayerBtn.addEventListener('click', () => {
            if (playerSection) {
                // Sembunyikan container
                playerSection.classList.add('hidden');
                playerSection.classList.remove('visible');
            }
            // Kosongkan iframe agar suara video langsung berhenti
            if (playerContainer) clearElement(playerContainer);
        });
    }
});