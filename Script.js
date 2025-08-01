const video = document.getElementById('video');
const playPause = document.getElementById('playPause');
const volume = document.getElementById('volume');
const fullscreen = document.getElementById('fullscreen');
const uploadInput = document.getElementById('upload');
const videoName = document.getElementById('video-name');
const controls = document.getElementById('controls');
const leftZone = document.getElementById('left-zone');
const rightZone = document.getElementById('right-zone');
const progress = document.getElementById('progress');
const timeDisplay = document.getElementById('time');
const speed = document.getElementById('speed');
const skipIntro = document.getElementById('skipIntro');
const toggleTheme = document.getElementById('toggle-theme');

let controlsTimeout;

function showControls() {
  controls.style.opacity = 1;
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    controls.style.opacity = 0;
  }, 3000);
}

document.addEventListener('mousemove', showControls);
document.addEventListener('touchstart', showControls);

playPause.addEventListener('click', () => {
  video.paused ? video.play() : video.pause();
});

volume.addEventListener('input', () => {
  video.volume = volume.value;
});

fullscreen.addEventListener('click', () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (file) {
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    video.load();
    video.play();
    videoName.textContent = file.name;
    showControls();
  }
});

video.addEventListener('timeupdate', () => {
  progress.value = video.currentTime;
  progress.max = video.duration;
  const current = formatTime(video.currentTime);
  const total = formatTime(video.duration);
  timeDisplay.textContent = `${current} / ${total}`;
});

progress.addEventListener('input', () => {
  video.currentTime = progress.value;
});

speed.addEventListener('change', () => {
  video.playbackRate = parseFloat(speed.value);
});

skipIntro.addEventListener('click', () => {
  video.currentTime += 15;
});

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// Double-tap seek
let lastTapLeft = 0;
let lastTapRight = 0;

leftZone.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastTapLeft < 300) {
    video.currentTime = Math.max(0, video.currentTime - 10);
  }
  lastTapLeft = now;
});

rightZone.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastTapRight < 300) {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  }
  lastTapRight = now;
});
