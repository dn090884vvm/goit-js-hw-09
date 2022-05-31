import Notiflix from 'notiflix';
const refs = {
  firstdelay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amountOfsteps: document.querySelector('input[name="amount"]'),
  onButtonSubmit: document.querySelector('button'),
};

refs.onButtonSubmit.addEventListener('click', onButtonClick);

function onButtonClick(event) {
  event.preventDefault();
  let delayEl = Number(refs.firstdelay.value);
  let additionalDelay = Number(refs.step.value);
  let stepsEl = Number(refs.amountOfsteps.value);

  for (let i = 1; i <= stepsEl; i += 1) {
    createPromise(i, delayEl)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }, delay);
      });
    delayEl += additionalDelay;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
