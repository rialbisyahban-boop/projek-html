
function startVoiceSearch() {
    // menghubungkan ke microfon 
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Browser Anda tidak mendukung pencarian suara.");
        return;
    }

    // mengelola audio microfon 
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const micBtn = document.getElementById('micBtn');
    const searchInput = document.getElementById('searchInput');

    if (micBtn) micBtn.classList.add('listening');
    // meminta apakah web di izinkan menggunakan mic 
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        if (searchInput) searchInput.value = transcript;
        if (micBtn) micBtn.classList.remove('listening');

        if (typeof searchMovies === 'function') {
            searchMovies();
        }
    };

    recognition.onspeechend = function() {
        recognition.stop();
        if (micBtn) micBtn.classList.remove('listening');
    };

    recognition.onerror = function(event) {
        if (micBtn) micBtn.classList.remove('listening');
        console.error('Error Suara:', event.error);
    };
}