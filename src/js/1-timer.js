import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconErr from '../img/gorn.svg';

const inputDate = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");

const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");

// змінна для обраної дати
let userSelectedDate;

// неактивна першопочатково кнопка
startButton.disabled = true;

// повідомлялка при обранні неправильної дати
const optionsFlatpackr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    //   перевірка на минуле/майбутнє дати
      if (selectedDates[0].getTime() <= Date.now()) {
          iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                messageColor: 'white',
                messageSize: '16',
                backgroundColor: 'red',
                theme: 'dark',
                iconUrl: iconErr,
                position: 'topRight',
                timeout: 3000,
                });
          startButton.disabled = true;
      } else {
          startButton.disabled = false;
          userSelectedDate = selectedDates[0].getTime();
      };
  },
};

const fp = flatpickr(inputDate, optionsFlatpackr);

// підслуховувач на кнопці
startButton.addEventListener("click", startCounter);

// функція запуска зворотнього лічильника
function startCounter(event) {
    // блочимо поле і кнопку
    inputDate.disabled = true;
    startButton.disabled = true;

    // запускаємо відмальовку з інтервалом в 1 сек
    const intervalID = setInterval(() => {
        const timeLine = userSelectedDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeLine);
        
        //ось і лічильник
        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);

        // щоб лічильник не пішов в мінус треба вчасно вийти
        // і дати можливість переобрати дату
        if (timeLine < 1000) {
            inputDate.disabled = false;
            clearInterval(intervalID);
        }
    }, 1000);
};

// домальовуємо 0 якщо ДД/ММ/ГГ/СС менше 10
function addLeadingZero(val) {
   return String(val).padStart(2, "0");
}

// функція конвертації часу
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

