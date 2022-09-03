/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/constants.js":
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "months": () => (/* binding */ months),
/* harmony export */   "weekday": () => (/* binding */ weekday)
/* harmony export */ });
const weekday = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];

const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

/***/ }),

/***/ "./js/fetchWeatherData.js":
/*!********************************!*\
  !*** ./js/fetchWeatherData.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchWeatherData": () => (/* binding */ fetchWeatherData)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ "./main.js");


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

function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=386fdf6b30fb46ada34215832220109&q=${_main__WEBPACK_IMPORTED_MODULE_0__.cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = Math.round(data.current.temp_c) + "&#176;";
            conditionOutput.innerHTML = (0,_main__WEBPACK_IMPORTED_MODULE_0__.translateCondition)(data.current.condition.text);
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

            dateOutput.innerHTML = `${d} ${(0,_main__WEBPACK_IMPORTED_MODULE_0__.nameOfTheMonth)(m)}, ${(0,_main__WEBPACK_IMPORTED_MODULE_0__.dayOfTheWeek)(d, m, y)} ${y}`;
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



/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cityInput": () => (/* binding */ cityInput),
/* harmony export */   "dayOfTheWeek": () => (/* binding */ dayOfTheWeek),
/* harmony export */   "nameOfTheMonth": () => (/* binding */ nameOfTheMonth),
/* harmony export */   "translateCondition": () => (/* binding */ translateCondition)
/* harmony export */ });
/* harmony import */ var _js_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/constants */ "./js/constants.js");
/* harmony import */ var _js_fetchWeatherData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/fetchWeatherData */ "./js/fetchWeatherData.js");


'use strict';

// Получение DOM элементов
const app = document.querySelector('.weather-app'),
      form = document.querySelector('.locationInput'),
      search = document.querySelector('.search'),
      cities = document.querySelectorAll('.city');

// Дефолтное значения для города при загрузке
let cityInput = "Москва";

cities.forEach(city => {
    city.addEventListener('click', (event) => {
        cityInput = event.target.innerHTML;

        (0,_js_fetchWeatherData__WEBPACK_IMPORTED_MODULE_1__.fetchWeatherData)();

        app.style.opacity = "0";
    });
});


form.addEventListener('submit', (event) => {
    if (search.value.length == 0) {
        alert('Введите название города');
    } else {
        cityInput = search.value;

        (0,_js_fetchWeatherData__WEBPACK_IMPORTED_MODULE_1__.fetchWeatherData)();

        search.value = "";

        app.style.opacity = "0";
    }

    event.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    console.log(_js_constants__WEBPACK_IMPORTED_MODULE_0__.weekday[new Date(`${day}/${month}/${year}`).getDay()]);
    return _js_constants__WEBPACK_IMPORTED_MODULE_0__.weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function nameOfTheMonth(month) {
    return _js_constants__WEBPACK_IMPORTED_MODULE_0__.months[month-1];
}

function translateCondition(condition) {
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

(0,_js_fetchWeatherData__WEBPACK_IMPORTED_MODULE_1__.fetchWeatherData)();

app.style.opacity = "1";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map