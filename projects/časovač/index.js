const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const alarmSound = document.getElementById("alarmSound");

let interval = null;
let timeLeft = 1500;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmSound.loop = false;
}

function startAlarm() {
  alarmSound.currentTime = 0;
  alarmSound.loop = true;
  alarmSound.play();
}

function startTimer() {
  // stop alarm if it's playing
  stopAlarm();

  if (interval) return;

  interval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(interval);
      interval = null;

      startAlarm(); // 🔊 alarm starts looping
      alert("Time's up!"); // user acknowledges
      stopAlarm(); // 🔕 stop when OK is clicked

      timeLeft = 1500;
      updateTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
  stopAlarm();
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  timeLeft = 1500;
  updateTimer();
  stopAlarm();
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
