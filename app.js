const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const seek = document.getElementById("seek");
const cur = document.getElementById("cur");
const dur = document.getElementById("dur");
const back15 = document.getElementById("back15");
const fwd30 = document.getElementById("fwd30");

function fmt(t) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function setPlayIcon() {
  playBtn.textContent = audio.paused ? "▶︎" : "❚❚";
}

playBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try { await audio.play(); } catch {}
  } else {
    audio.pause();
  }
  setPlayIcon();
});

audio.addEventListener("loadedmetadata", () => {
  dur.textContent = fmt(audio.duration);
  seek.value = 0;
});

audio.addEventListener("timeupdate", () => {
  cur.textContent = fmt(audio.currentTime);
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    seek.value = (audio.currentTime / audio.duration) * 100;
  }
});

seek.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (seek.value / 100) * audio.duration;
  }
});

back15.addEventListener("click", () => {
  audio.currentTime = Math.max(0, audio.currentTime - 15);
});

fwd30.addEventListener("click", () => {
  if (Number.isFinite(audio.duration)) {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 30);
  } else {
    audio.currentTime = audio.currentTime + 30;
  }
});


audio.addEventListener("play", setPlayIcon);
audio.addEventListener("pause", setPlayIcon);
setPlayIcon();
