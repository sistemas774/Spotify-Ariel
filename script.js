// Base de datos de géneros/carpetas
const genres = [
    {
        id: 'dance',
        name: 'Dance',
        icon: 'fa-compact-disc',
        color: '#FF6B6B',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'cumbia',
        name: 'Cumbia',
        icon: 'fa-guitar',
        color: '#4ECDC4',
        image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'reggaeton',
        name: 'Reggaeton',
        icon: 'fa-fire',
        color: '#FFD166',
        image: 'https://images.unsplash.com/photo-1519281682544-5f37c5ab38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'folklore',
        name: 'Folklore',
        icon: 'fa-mountain',
        color: '#06D6A0',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'gym',
        name: 'Gym',
        icon: 'fa-dumbbell',
        color: '#118AB2',
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'lentos',
        name: 'Lentos',
        icon: 'fa-heart',
        color: '#EF476F',
        image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'hiphop',
        name: 'Hip Hop',
        icon: 'fa-microphone',
        color: '#7209B7',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'rock',
        name: 'Rock',
        icon: 'fa-music',
        color: '#F8961E',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'top100',
        name: 'Top 100',
        icon: 'fa-trophy',
        color: '#FFD700',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
];

// Base de datos de canciones
let songs = [
    {
        id: 1,
        title: "Fading Like A Flower",
        artist: "Roxette",
        genre: "dance",
        duration: "3:53",
        url: "https://docs.google.com/uc?export=download&id=1CR3KPFWew_ePi4E05P9Y3kO_KSUPRTKH",
        image: "https://i.ibb.co/pjjFkKGx/Fading-Like-A-Flower.jpg"
    },
    {
        id: 2,
        title: "Tattoo",
        artist: "Loreen",
        genre: "dance",
        duration: "3:24",
        url: "https://docs.google.com/uc?export=download&id=1gC2Qd3C9T641ykLlmJeBAhLr3zotKdUm",
        image: "https://i.ibb.co/BHjjTdX4/Tatoo.jpg"
    },
    {
        id: 2,
        title: "Roses x Children (Remix)",
        artist: "Remix",
        genre: "dance",
        duration: "3:24",
        url: "https://docs.google.com/uc?export=download&id=1zcrsNny-3WT6f5pzNVvHNHyEoi4GoNpf",
        image: "https://i.ibb.co/Q3JBg0Hq/Roses-x-Children-Remix.jpg"
    },
    {
        id: 2,
        title: "What Is Love (Techno Version)",
        artist: "Remix",
        genre: "dance",
        duration: "3:24",
        url: "https://docs.google.com/uc?export=download&id=11LG6in7sc2wgogl5280civ4sa87JIdhV",
        image: "https://i.ibb.co/hx7VRJkP/What-Is-Love-Techno-Version.jpg"
    }
];

// Estado de la aplicación
let currentGenre = 'dance';
let currentSongIndex = 0;
let isPlaying = false;
let audioPlayer = new Audio();
let isGridView = true;
let isSearching = false;
let currentSearchQuery = '';

// SOLUCIÓN: Función para obtener audio compatible con CORS
function getCompatibleAudioStream(url) {
    // Usamos un proxy CORS gratuito para evitar problemas
    return `https://corsproxy.io/?${encodeURIComponent(url)}`;
}

// Elementos del DOM
const genresSidebar = document.getElementById('genres-sidebar');
const songsGrid = document.getElementById('songs-grid');
const songsList = document.getElementById('songs-list');
const genreBanner = document.getElementById('genre-banner');
const genreBannerIcon = document.getElementById('genre-banner-icon');
const currentGenreName = document.getElementById('current-genre-name');
const currentGenreCount = document.getElementById('current-genre-count');
const mobilePlayer = document.getElementById('mobile-player');
const playerSongTitle = document.getElementById('player-song-title');
const playerSongArtist = document.getElementById('player-song-artist');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const searchResultsInfo = document.getElementById('search-results-info');
const searchResultsCount = document.getElementById('search-results-count');
const searchNavBtn = document.getElementById('search-nav-btn');
const homeBtn = document.getElementById('home-btn');
const libraryBtn = document.getElementById('library-btn');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderGenres();
    loadGenre(currentGenre);
    
    // Event listeners
    setupEventListeners();
});

// Renderizar la barra de géneros
function renderGenres() {
    genresSidebar.innerHTML = '';
    
    genres.forEach(genre => {
        const genreElement = document.createElement('div');
        genreElement.className = `genre-item ${genre.id === currentGenre ? 'active' : ''}`;
        genreElement.dataset.genre = genre.id;
        genreElement.style.color = genre.id === currentGenre ? genre.color : '';
        genreElement.style.backgroundColor = genre.id === currentGenre ? '#282828' : '';
        
        genreElement.innerHTML = `
            <i class="fas ${genre.icon} genre-icon"></i>
            <span class="genre-name">${genre.name}</span>
        `;
        
        genreElement.addEventListener('click', function() {
            const selectedGenre = this.dataset.genre;
            selectGenre(selectedGenre);
            isSearching = false;
            searchResultsInfo.classList.add('hidden');
        });
        
        genresSidebar.appendChild(genreElement);
    });
}

// Seleccionar un género
function selectGenre(genreId) {
    currentGenre = genreId;
    isSearching = false;
    currentSearchQuery = '';
    searchInput.value = '';
    clearSearchBtn.classList.remove('visible');
    
    // Actualizar la barra lateral
    document.querySelectorAll('.genre-item').forEach(item => {
        const genre = genres.find(g => g.id === item.dataset.genre);
        if (item.dataset.genre === genreId) {
            item.classList.add('active');
            item.style.color = genre.color;
            item.style.backgroundColor = '#282828';
        } else {
            item.classList.remove('active');
            item.style.color = '';
            item.style.backgroundColor = '';
        }
    });
    
    // Cargar el género seleccionado
    loadGenre(genreId);
}

// Cargar un género y sus canciones
function loadGenre(genreId) {
    const genre = genres.find(g => g.id === genreId);
    if (!genre) return;
    
    // Actualizar el banner
    currentGenreName.textContent = genre.name;
    genreBanner.style.background = `linear-gradient(135deg, ${genre.color}40, ${genre.color}80)`;
    genreBannerIcon.innerHTML = `<i class="fas ${genre.icon}"></i>`;
    genreBannerIcon.style.color = genre.color;
    
    // Filtrar canciones por género
    const genreSongs = songs.filter(song => song.genre === genreId);
    currentGenreCount.textContent = `${genreSongs.length} canciones`;
    
    // Renderizar canciones
    renderSongs(genreSongs);
}

// Función de búsqueda
function performSearch(query) {
    if (!query.trim()) {
        isSearching = false;
        searchResultsInfo.classList.add('hidden');
        loadGenre(currentGenre);
        return;
    }
    
    isSearching = true;
    currentSearchQuery = query.toLowerCase();
    
    // Filtrar canciones
    const searchResults = songs.filter(song => 
        song.title.toLowerCase().includes(currentSearchQuery) ||
        song.artist.toLowerCase().includes(currentSearchQuery) ||
        song.genre.toLowerCase().includes(currentSearchQuery)
    );
    
    // Mostrar información de resultados
    searchResultsInfo.classList.remove('hidden');
    searchResultsCount.textContent = `${searchResults.length} canciones encontradas`;
    
    // Actualizar el banner para búsqueda
    currentGenreName.textContent = `Búsqueda: "${query}"`;
    currentGenreCount.textContent = `${searchResults.length} resultados`;
    genreBanner.style.background = `linear-gradient(135deg, #1DB95440, #1DB95480)`;
    genreBannerIcon.innerHTML = `<i class="fas fa-search"></i>`;
    genreBannerIcon.style.color = '#1DB954';
    
    // Renderizar resultados
    renderSongs(searchResults);
}

// Renderizar canciones según la vista activa
function renderSongs(songList) {
    if (isGridView) {
        renderSongsGrid(songList);
    } else {
        renderSongsList(songList);
    }
}

// Renderizar canciones en formato grid
function renderSongsGrid(songList) {
    songsGrid.innerHTML = '';
    songsList.style.display = 'none';
    songsGrid.style.display = 'grid';
    
    if (songList.length === 0) {
        songsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #b3b3b3;">
                <i class="fas fa-music" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <h3>${isSearching ? 'No se encontraron canciones' : 'No hay canciones en este género'}</h3>
                <p>${isSearching ? 'Intenta con otra búsqueda' : 'Agrega canciones manualmente'}</p>
            </div>
        `;
        return;
    }
    
    songList.forEach((song, index) => {
        const songElement = document.createElement('div');
        const isCurrentSong = songs[currentSongIndex] && song.id === songs[currentSongIndex].id;
        
        songElement.className = `song-card ${isCurrentSong && isPlaying ? 'playing' : ''}`;
        songElement.dataset.index = index;
        
        songElement.innerHTML = `
            <div class="song-image">
                ${song.image ? `<img src="${song.image}" alt="${song.title}">` : `<i class="fas fa-music"></i>`}
                ${isCurrentSong && isPlaying ? `
                    <div class="wave-container" style="position: absolute; bottom: 10px; right: 10px;">
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                    </div>
                ` : ''}
            </div>
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;
        
        songElement.addEventListener('click', function() {
            const songIndexInAll = songs.findIndex(s => s.id === song.id);
            if (songIndexInAll !== -1) {
                playSong(songIndexInAll);
            }
        });
        
        songsGrid.appendChild(songElement);
    });
}

// Renderizar canciones en formato lista
function renderSongsList(songList) {
    songsList.innerHTML = '';
    songsGrid.style.display = 'none';
    songsList.style.display = 'block';
    
    if (songList.length === 0) {
        songsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #b3b3b3;">
                <i class="fas fa-music" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <h3>${isSearching ? 'No se encontraron canciones' : 'No hay canciones en este género'}</h3>
                <p>${isSearching ? 'Intenta con otra búsqueda' : 'Agrega canciones manualmente'}</p>
            </div>
        `;
        return;
    }
    
    songList.forEach((song, index) => {
        const songElement = document.createElement('div');
        const isCurrentSong = songs[currentSongIndex] && song.id === songs[currentSongIndex].id;
        
        songElement.className = `song-item ${isCurrentSong && isPlaying ? 'playing' : ''}`;
        songElement.dataset.index = index;
        
        songElement.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-info-list">
                <h4>${song.title} ${isCurrentSong && isPlaying ? '<span class="wave-container"><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div></span>' : ''}</h4>
                <p>${song.artist}</p>
            </div>
            <div class="song-duration">${song.duration}</div>
            <i class="fas fa-ellipsis-h" style="color: #b3b3b3;"></i>
        `;
        
        songElement.addEventListener('click', function(e) {
            if (!e.target.classList.contains('fa-ellipsis-h')) {
                const songIndexInAll = songs.findIndex(s => s.id === song.id);
                if (songIndexInAll !== -1) {
                    playSong(songIndexInAll);
                }
            }
        });
        
        songsList.appendChild(songElement);
    });
}

// CORRECCIÓN: Reproducir una canción
function playSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    
    console.log("Intentando reproducir:", song.title);
    
    // Usar el proxy CORS para evitar problemas
    const proxiedUrl = getCompatibleAudioStream(song.url);
    
    // Cargar y reproducir con manejo de errores
    audioPlayer.src = proxiedUrl;
    audioPlayer.load();
    
    // Configurar evento de error
    audioPlayer.onerror = function() {
        console.error("Error de audio:", audioPlayer.error);
        showNotification("Error al cargar el audio", "error");
    };
    
    // Intentar reproducir
    audioPlayer.play().then(() => {
        console.log("¡Éxito! Reproduciendo: " + song.title);
        isPlaying = true;
        updatePlayerInfo();
        updatePlayPauseButton();
        mobilePlayer.classList.remove('hidden');
        
        // Actualizar la vista para mostrar la canción en reproducción
        updatePlayingUI();
        
        // Mostrar notificación de éxito
        showNotification("Reproduciendo: " + song.title, "success");
    }).catch(error => {
        console.error("Error al reproducir:", error);
        
        // Intentar con URL directa como fallback
        console.log("Probando con URL directa como fallback...");
        audioPlayer.src = song.url;
        audioPlayer.play().then(() => {
            console.log("¡Funcionó con URL directa!");
            isPlaying = true;
            updatePlayerInfo();
            updatePlayPauseButton();
            mobilePlayer.classList.remove('hidden');
            updatePlayingUI();
            showNotification("Reproduciendo: " + song.title, "success");
        }).catch(error2 => {
            console.error("Error con URL directa:", error2);
            showNotification("No se pudo reproducir: " + song.title, "error");
        });
    });
}

// CORRECCIÓN: Pausar/Reanudar canción
function togglePlayPause() {
    if (songs.length === 0) return;
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        console.log("Canción pausada");
    } else {
        audioPlayer.play().then(() => {
            isPlaying = true;
            console.log("Canción reanudada");
        }).catch(error => {
            console.error("Error al reanudar:", error);
            showNotification("Error al reanudar la reproducción", "error");
        });
    }
    
    updatePlayPauseButton();
    updatePlayingUI();
}

// Actualizar UI para mostrar canción en reproducción
function updatePlayingUI() {
    // Remover clase 'playing' de todas las canciones
    document.querySelectorAll('.song-card').forEach(card => {
        card.classList.remove('playing');
    });
    
    document.querySelectorAll('.song-item').forEach(item => {
        item.classList.remove('playing');
    });
    
    // Agregar clase 'playing' a la canción actual si está reproduciéndose
    if (isPlaying && songs[currentSongIndex]) {
        const currentSongId = songs[currentSongIndex].id;
        
        // Para vista grid
        document.querySelectorAll('.song-card').forEach(card => {
            const songIndex = parseInt(card.dataset.index);
            const songList = isSearching ? 
                songs.filter(song => 
                    song.title.toLowerCase().includes(currentSearchQuery) ||
                    song.artist.toLowerCase().includes(currentSearchQuery) ||
                    song.genre.toLowerCase().includes(currentSearchQuery)
                ) : 
                songs.filter(song => song.genre === currentGenre);
            
            if (songList[songIndex] && songList[songIndex].id === currentSongId) {
                card.classList.add('playing');
            }
        });
        
        // Para vista lista
        document.querySelectorAll('.song-item').forEach(item => {
            const songIndex = parseInt(item.dataset.index);
            const songList = isSearching ? 
                songs.filter(song => 
                    song.title.toLowerCase().includes(currentSearchQuery) ||
                    song.artist.toLowerCase().includes(currentSearchQuery) ||
                    song.genre.toLowerCase().includes(currentSearchQuery)
                ) : 
                songs.filter(song => song.genre === currentGenre);
            
            if (songList[songIndex] && songList[songIndex].id === currentSongId) {
                item.classList.add('playing');
            }
        });
    }
    
    // Actualizar el reproductor
    renderSongs(isSearching ? 
        songs.filter(song => 
            song.title.toLowerCase().includes(currentSearchQuery) ||
            song.artist.toLowerCase().includes(currentSearchQuery) ||
            song.genre.toLowerCase().includes(currentSearchQuery)
        ) : 
        songs.filter(song => song.genre === currentGenre)
    );
}

// Función para mostrar notificación
function showNotification(message, type = "success") {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    
    // Configurar colores según el tipo
    const bgColor = type === "success" ? "#1DB954" : "#FF6B6B";
    const textColor = type === "success" ? "#000" : "#FFF";
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${bgColor};
        color: ${textColor};
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Actualizar información del reproductor
function updatePlayerInfo() {
    if (songs.length > 0 && songs[currentSongIndex]) {
        const song = songs[currentSongIndex];
        playerSongTitle.textContent = song.title;
        playerSongArtist.textContent = song.artist;
    }
}

// CORRECCIÓN: Actualizar botón play/pause
function updatePlayPauseButton() {
    const playIcon = playPauseBtn.querySelector('i');
    playIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

// Configurar event listeners
function setupEventListeners() {
    // CORRECCIÓN: Controles del reproductor
    playPauseBtn.addEventListener('click', togglePlayPause);

    prevBtn.addEventListener('click', function() {
        if (songs.length === 0) return;
        
        let newIndex = currentSongIndex - 1;
        if (newIndex < 0) newIndex = songs.length - 1;
        
        playSong(newIndex);
    });

    nextBtn.addEventListener('click', function() {
        if (songs.length === 0) return;
        
        let newIndex = currentSongIndex + 1;
        if (newIndex >= songs.length) newIndex = 0;
        
        playSong(newIndex);
    });

    // Cuando termina una canción
    audioPlayer.addEventListener('ended', function() {
        console.log("Canción terminada, pasando a la siguiente...");
        let newIndex = currentSongIndex + 1;
        if (newIndex >= songs.length) newIndex = 0;
        
        playSong(newIndex);
    });

    // Cambiar vista (grid/list)
    gridViewBtn.addEventListener('click', function() {
        if (!isGridView) {
            isGridView = true;
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            renderSongs(isSearching ? 
                songs.filter(song => 
                    song.title.toLowerCase().includes(currentSearchQuery) ||
                    song.artist.toLowerCase().includes(currentSearchQuery) ||
                    song.genre.toLowerCase().includes(currentSearchQuery)
                ) : 
                songs.filter(song => song.genre === currentGenre)
            );
        }
    });

    listViewBtn.addEventListener('click', function() {
        if (isGridView) {
            isGridView = false;
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            renderSongs(isSearching ? 
                songs.filter(song => 
                    song.title.toLowerCase().includes(currentSearchQuery) ||
                    song.artist.toLowerCase().includes(currentSearchQuery) ||
                    song.genre.toLowerCase().includes(currentSearchQuery)
                ) : 
                songs.filter(song => song.genre === currentGenre)
            );
        }
    });

    // Búsqueda
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query) {
            clearSearchBtn.classList.add('visible');
            performSearch(query);
        } else {
            clearSearchBtn.classList.remove('visible');
            isSearching = false;
            searchResultsInfo.classList.add('hidden');
            loadGenre(currentGenre);
        }
    });

    // Limpiar búsqueda
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        clearSearchBtn.classList.remove('visible');
        isSearching = false;
        currentSearchQuery = '';
        searchResultsInfo.classList.add('hidden');
        loadGenre(currentGenre);
    });

    // Navegación inferior
    homeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Actualizar clases activas
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
        
        // Volver al género actual
        isSearching = false;
        currentSearchQuery = '';
        searchInput.value = '';
        clearSearchBtn.classList.remove('visible');
        searchResultsInfo.classList.add('hidden');
        loadGenre(currentGenre);
    });

    searchNavBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Actualizar clases activas
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
        
        // Enfocar el campo de búsqueda
        searchInput.focus();
    });

    libraryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Actualizar clases activas
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
        
        // Mostrar todas las canciones
        isSearching = false;
        currentSearchQuery = '';
        searchInput.value = '';
        clearSearchBtn.classList.remove('visible');
        searchResultsInfo.classList.add('hidden');
        
        currentGenreName.textContent = 'Todas las canciones';
        currentGenreCount.textContent = `${songs.length} canciones`;
        genreBanner.style.background = `linear-gradient(135deg, #1DB95440, #1DB95480)`;
        genreBannerIcon.innerHTML = `<i class="fas fa-music"></i>`;
        genreBannerIcon.style.color = '#1DB954';
        
        // Mostrar todas las canciones
        renderSongs(songs);
    });

    // Permitir búsqueda con Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
}

// Instrucciones iniciales
setTimeout(() => {
    if (songs.filter(s => s.genre === currentGenre).length === 0) {
        showNotification("¡Bienvenido a tu Spotify! Usa la barra de búsqueda para encontrar canciones", "info");
    }

}, 1500);
