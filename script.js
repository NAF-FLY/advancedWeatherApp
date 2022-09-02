'use strict';

// Получение DOM элементов
const app = document.querySelector('.weather-app'),
      temp = document.querySelector('.temp'),
      dateOutput = document.querySelector('.date'),
      timeOutput = document.querySelector('.time'),
      conditionOutput = document.querySelector('.condition'),
      nameOutput = document.querySelector('.name'),
      icon = document.querySelector('.icon'),
      cloudOutput = document.querySelector('.cloud'),
      humidityOutput = document.querySelector('.humidity'),
      windOutput = document.querySelector('.wind'),
      form = document.querySelector('.locationInput'),
      search = document.querySelector('.search'),
      btn = document.querySelector('.submit'),
      cities = document.querySelectorAll('.city');

// Дефолтное значения для города при загрузке
let cityInput = "Moscow";

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

function dayOfTheWeek(day, month, year) {
    const weekday = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=386fdf6b30fb46ada34215832220109&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr(
                "//cdn.weatherapi.com/weather/64x64".length);

            icon.src = "./icons/" + iconId;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "км/ч";

            let timeOfDay = "day";

            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if(code == 1000) {
                app.style.backgroundImage = `
                    url(./images/${timeOfDay}/clear)`;
                
                btn.style.background = "#e5ba92";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }

            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282 
            ) {
                app.style.backgroundImage = `
                    url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = '#181e27';
                }
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `
                    url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = '#325c80';
                }

            } else {
                app.style.backgroundImage = `
                    url(./images/${timeOfDay}/showy.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = '#1b1b1b';
                }
            }
            
            app.style.opacity = "1";
        })

        .catch(() => {
            alert('Город не найден, повторите еще раз');
            app.style.opacity = "1";
        });
}

fetchWeatherData();

app.style.opacity = "1";
