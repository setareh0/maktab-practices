const time = document.querySelector(".time");
const start = document.querySelector(".start");
const cancel = document.querySelector(".cancel");

const selectList = document.querySelector(".list-select");
let second = 0;
const custom = document.querySelector(".custom");

const alarmSound = document.getElementById("alarmSound");
const icon = document.querySelector(".icon");

function setTime() {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const seconds = second % 60;
  time.innerHTML = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

selectList.addEventListener("click", function (event) {
  if (event.target.dataset.s) {
    second = parseInt(selectList.value);
  } else if (event.target.dataset.m) {
    second = parseInt(selectList.value) * 60;
  } else if (event.target.dataset.h) {
    second = parseInt(selectList.value) * 3600;
  } else if (event.target.dataset.custom) {
    customTime();
  }
  setTime();
});

let timeInterval;
let run;
function startTime() {
  if (run) {
    resetTime();
  } else {
    run = true;
    start.innerText = "Stop";
    start.style.background = "red";
    start.style.border = "none";
    if (second > 0) {
      timeInterval = setInterval(() => {
        if (second <= 0) {
          clearInterval(timeInterval);
          resetTime();
          alarmSound.play();
          icon.style.background = "#F25C61";
          icon.style.color = "white";
          icon.style.border = "none";
        } else {
          second--;
          setTime();
        }
      }, 1000);
    }
  }
}

function resetTime() {
  run = false;
  clearInterval(timeInterval);
  start.innerText = "Start";
  start.style.background = "";
}

start.addEventListener("click", startTime);

function stopTime() {
  second = 0;
  time.innerText = "00:00:00";
  resetTime();
}
cancel.addEventListener("click", stopTime);

function customTime() {
  custom.innerHTML = `
     <label for="custom">Minute:</label>
     <input class="customInput" type="number" />
     <button class="sub" type="submit">Submit</button>
    `;

  const customInput = document.querySelector(".customInput");
  const customSub = document.querySelector(".sub");

  customSub.addEventListener("click", function () {
    const customTime = parseFloat(customInput.value);
    if (customTime && customTime >= 0) {
      second = Math.floor(customTime * 60);
      setTime();
    }
  });
}

icon.addEventListener("click", function () {
  alarmSound.pause();
  icon.style = "";
});
