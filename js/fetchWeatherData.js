import {dayOfTheWeek, nameOfTheMonth, translateCondition, cityInput} from '../main';

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
      btn = document.querySelector('.submit')

export function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=386fdf6b30fb46ada34215832220109&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = Math.round(data.current.temp_c) + "&#176;";
            conditionOutput.innerHTML = translateCondition(data.current.condition.text);
            console.log(data.current.condition.text);
            switch (data.current.condition.text) {
                case 'Sunny':
                    conditionOutput.innerHTML = "Солнечно";
                    break;
                case 'Clear':
                    conditionOutput.innerHTML = 'Безоблачно';
                    break;
                case 'Partly cloudy':
                    conditionOutput.innerHTML = "Переменная облачность";
                    break;
                case 'Patchy rain possible':
                    conditionOutput.innerHTML = "Возможен кратковременный дождь";
                    break;
                case 'Light rain':
                    conditionOutput.innerHTML = "Легкий дождь";
                    break; 
                case 'Overcast':
                    conditionOutput.innerHTML = "Пасмурная погода";
                    break;  
                case 'Mist':
                    conditionOutput.innerHTML = "Туман";
                    break;
                case 'Blizzard':
                    conditionOutput.innerHTML = "Снежная буря";
                    break;
                case 'Fog':
                    conditionOutput.innerHTML = "Мгла";
                    break;
                case 'Light rain shower':
                    conditionOutput.innerHTML = "Небольшой дождь";
                    break;
                default: 
                    conditionOutput.innerHTML = "Попросите разработчика перевести :)";
                    break;
            } 

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${d} ${nameOfTheMonth(m)}, ${dayOfTheWeek(d, m, y)} ${y}`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr(
                "//cdn.weatherapi.com/weather/64x64".length);

            icon.src = "./icons/" + iconId;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = ((data.current.wind_kph)*1000/3600).toFixed(1) + "м/c";

            let timeOfDay = "day";

            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if(code == 1000) {
                app.style.backgroundImage = `
                    url(./images/${timeOfDay}/clear.jpg)`;
                
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

