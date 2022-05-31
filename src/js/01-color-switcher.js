const refs = {
  bodyEl: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
  isInterval: null,
};

// console.log(refs.startButton);
// console.log(refs.stopButton);

refs.stopButton.setAttribute('disabled', 'disabled');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startButton.addEventListener('click', changeColor);
refs.stopButton.addEventListener('click', stopChangingColor);

function changeColor() {
  refs.stopButton.disabled = false;
  isInterval = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = randomColor;
  }, 1000);
  refs.startButton.setAttribute('disabled', 'disabled');
}

function stopChangingColor() {
  if (isInterval) {
    clearInterval(isInterval);
  }
  refs.startButton.disabled = false;
  refs.stopButton.setAttribute('disabled', 'disabled');
}
