const songs = [
    {name: "song (1)", title: "New song 2025", artist: "Alan Walker"},
    {name: "song (2)", title: "New song 2024", artist: "James"},
    {name: "song (3)", title: "New song 2023", artist: "Ali Noor"},
    {name: "song (4)", title: "New song 2022", artist: "Alan Walker"},
    {name: "song (5)", title: "New song 2021", artist: "Olivia Rodrigo"},
    {name: "song (6)", title: "New song 2020", artist: "Celine Dion"}
];
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = `${song.name}.mp3`;
}
loadSong(songs[songIndex]);

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

function nextSong () {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
function prevSong () {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const progressPerCent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPerCent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});
progressBarContainer.addEventListener('click', (e) => {
    const width = progressBarContainer.clientWidth;
    const clickx = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickx / width) * duration;
});
audio.addEventListener('ended', nextSong);
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

