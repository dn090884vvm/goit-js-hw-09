import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  selectedDate: null,
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  timer: document.querySelector('.timer'),
};

refs.days.textContent += '::';
refs.hours.textContent += '::';
refs.minutes.textContent += '::';

refs.startButton.disabled = true;
const moduleOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else refs.startButton.disabled = false;
    refs.selectedDate = selectedDates;
  },
};

const dateField = flatpickr('#datetime-picker', moduleOptions);

refs.startButton.addEventListener('click', setTheTimer);

function setTheTimer() {
  //   refs.timer.classList.remove('timer-finished');

  refs.startButton.disabled = true;
  const userSelectedDate = refs.selectedDate[0].getTime();
  const timerID = setInterval(() => {
    const dateToFinish = userSelectedDate - Date.now();
    if (dateToFinish >= 0) {
      const timeComponents = convertMs(dateToFinish);
      updateClockNumbers(timeComponents);
    } else {
      clearInterval(timerID);
      //   refs.timer.classList.add('timer-finished');
    }
  }, 1000);
}

function updateClockNumbers({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}::`;
  refs.hours.textContent = `${hours}::`;
  refs.minutes.textContent = `${minutes}::`;
  refs.seconds.textContent = `${seconds}`;
}

function addingZeroToNumber(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addingZeroToNumber(Math.floor(ms / day));
  // Remaining hours
  const hours = addingZeroToNumber(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addingZeroToNumber(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addingZeroToNumber(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
///---------------------------------

// console.log('current data', Date.now());
// console.log('set data', selectedDates[0].getTime());

//console.log('checking', refs.selectedDate[0].getTime());

//   console.log(userSelectedDate);
//   const a = dateField.selectedDates[0];
//   const b = a.getTime();
//   console.log(a, '   ', b);

// console.log(convertMs(dateToFinish));

// const a = refs.selectedDate[0].getTime();
// console.log(refs.selectedDate[0]);
// const c = refs.selectedDate[0];
// console.log(c);
// console.log(dateField.selectedDates[0].getTime());
//console.log('returned data', dateField.selectedDates[0]);
// console.log(a);

// const chosenDateByUser = dateField.selectedDates[0].getTime();

// const chosenDateByUser = dateField.selectedDates;

//console.log('это установленная дата в мс', chosenDateByUser);

// const currentData = new Date().getTime();

// console.log('это текущая дата в мс', currentData);
