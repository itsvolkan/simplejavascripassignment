const images = [
  ['img/dog.png', 'img/cat.png', 'img/horse.png'],
  ['img/mouse.png', 'img/fish.png', 'img/cow.png'],
  ['img/roster.png', 'img/rabbit.png', 'img/bird.png']
];

const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const randomizeButton = document.getElementById('randomize-button');
const imageCounter = document.getElementById('image-counter');
const refreshTimeInput = document.getElementById('refresh-time-input');
const timer = document.getElementById('timer');

let imageChangeCount = 0;
let refreshTimer;
let countdownTimer;

function selectRandomImages() {
  const randomImages = [];

  for (let i = 0; i < images.length; i++) {
    const randomIndex = Math.floor(Math.random() * images[i].length);
    randomImages.push(images[i][randomIndex]);
  }

  return randomImages;
}

function updateImages() {
  const randomImages = selectRandomImages();
  image1.src = randomImages[0];
  image2.src = randomImages[1];
  image3.src = randomImages[2];
}

function handleImageClick(event) {
  const target = event.target;
  target.classList.remove('spin');
  setTimeout(() => {
    const randomImages = selectRandomImages();
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    target.src = randomImage;
    target.classList.add('spin');
    imageChangeCount++;
    imageCounter.textContent = `Image changes: ${imageChangeCount}`;
  }, 0);
}

function handleRandomizeButtonClick() {
  updateImages();
  resetRefreshTimer();
  imageChangeCount += 3;
  imageCounter.textContent = `Image changes: ${imageChangeCount}`;
}

function validateInput() {
  const inputValue = parseInt(refreshTimeInput.value);
  if (Number.isNaN(inputValue) || inputValue < 0 || inputValue > 10000) {
    refreshTimeInput.value = ''; 
    clearTimeout(refreshTimer);
    clearTimeout(countdownTimer);
  } else {
    if (inputValue >= 500) {
      resetRefreshTimer();
    }
  }
}

function updateTimerDisplay(time) {
  if (time > 0) {
    timer.textContent = (time / 1000).toFixed(1);
    if (time > 7000) {
      timer.style.color = 'white';
      timer.style.backgroundColor = 'green';
    } else if (time > 4000) {
      timer.style.color = 'black';
      timer.style.backgroundColor = 'yellow';
    } else {
      timer.style.color = 'white';
      timer.style.backgroundColor = 'red';
    }
  } else {
    handleRandomizeButtonClick();
  }
}

function startTimer(time) {
  updateTimerDisplay(time);
  countdownTimer = setInterval(() => {
    time -= 100;
    updateTimerDisplay(time);
    if (time <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      resetRefreshTimer();
    }
  }, 100);
}

function resetRefreshTimer() {
  clearTimeout(refreshTimer);
  clearTimeout(countdownTimer);
  const refreshTime = parseInt(refreshTimeInput.value);
  startTimer(refreshTime);
}

image1.addEventListener('click', handleImageClick);
image2.addEventListener('click', handleImageClick);
image3.addEventListener('click', handleImageClick);
randomizeButton.addEventListener('click', handleRandomizeButtonClick);
refreshTimeInput.addEventListener('input', validateInput);

updateImages();

validateInput();
