import {weekday, months} from './js/constants';
import { fetchWeatherData } from './js/fetchWeatherData';
'use strict';

// Получение DOM элементов
const app = document.querySelector('.weather-app'),
      form = document.querySelector('.locationInput'),
      search = document.querySelector('.search'),
      cities = document.querySelectorAll('.city');

// Дефолтное значения для города при загрузке
export let cityInput = "Москва";

cities.forEach(city => {
    city.addEventListener('click', (event) => {
        cityInput = event.target.innerHTML;

        fetchWeatherData();

        app.style.opacity = "0";
    });
});


form.addEventListener('submit', (event) => {
    if (search.value.length == 0) {
        alert('Введите название города');
    } else {
        cityInput = search.value;

        fetchWeatherData();

        search.value = "";

        app.style.opacity = "0";
    }

    event.preventDefault();
});

export function dayOfTheWeek(day, month, year) {
    console.log(weekday[new Date(`${day}/${month}/${year}`).getDay()]);
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

export function nameOfTheMonth(month) {
    return months[month-1];
}

export function translateCondition(condition) {
    switch (condition) {
        case 'Sunny':
            return "Солнечно";
        case 'Clear':
            return 'Безоблачно';
        case 'Partly cloudy':
            return "Переменная облачность";
        case 'Patchy rain possible':
            return "Возможен кратковременный дождь";
        case 'Light rain':
            return "Легкий дождь"; 
        case 'Overcast':
            return "Пасмурная погода";  
        case 'Mist':
            return "Туман";
        case 'Blizzard':
            return "Снежная буря";
        case 'Fog':
            return "Мгла";
        case 'Light rain shower':
            return "Небольшой дождь";
        default: 
            return "Попросите разработчика перевести :)";
    } 
}

fetchWeatherData();

app.style.opacity = "1";