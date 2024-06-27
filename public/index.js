var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "83397f920b3d9223fac7762d5869250e";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const cityTitleEl = document.getElementById("cityTitle");
const iconEl = document.getElementById("icon");
const temperatureEl = document.getElementById("temperature");
const statusEl = document.getElementById("status");
const descriptionEl = document.getElementById("description");
const windspeedEl = document.getElementById("windspeed");
const humidityEl = document.getElementById("humidity");
const pressureEl = document.getElementById("pressure");
const searchFormEl = document.getElementById("searchForm");
const dateEl = document.getElementById("date");
const errorEl = document.getElementById("error");
const forecastListEl = document.getElementById("forecastList");
function fetchWeatherForecast(cityName, apiKey = API_KEY) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = `${API_URL}/?units=metric&q=${cityName}&appid=${apiKey}`;
        try {
            const response = yield fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Weather Fetch error! Status: ${response.status}`);
            }
            const hourlyResponse = yield response.json();
            return hourlyResponse;
        }
        catch (error) {
            console.error("Error fetching weather forecast:", error);
        }
        return null;
    });
}
function createForecastElement(hourly) {
    var _a, _b, _c, _d;
    const forecastEl = document.createElement("li");
    forecastEl.classList.add("rounded", "bg-white", "bg-opacity-10", "p-4");
    const time = hourly.dt_txt.slice(11, 16);
    const temperature = hourly.main.temp.toFixed(0);
    const status = (_b = (_a = hourly.weather[0]) === null || _a === void 0 ? void 0 : _a.main) !== null && _b !== void 0 ? _b : "N/A";
    const icon = (_d = (_c = hourly.weather[0]) === null || _c === void 0 ? void 0 : _c.icon) !== null && _d !== void 0 ? _d : "01d";
    forecastEl.innerHTML = `
        <p>${time}</p>
        <img class=\"mx-auto\" src="http://openweathermap.org/img/wn/${icon}.png" alt="${status}">
        <p>${temperature}°C</p>
    `;
    return forecastEl;
}
function displayWeather(response) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        if (response.list.length === 0)
            return;
        errorEl.textContent = "";
        const firstItem = response.list[0];
        const city = response.city.name;
        const temperature = (_a = firstItem === null || firstItem === void 0 ? void 0 : firstItem.main.temp.toFixed(0)) !== null && _a !== void 0 ? _a : "N/A";
        const status = (_c = (_b = firstItem === null || firstItem === void 0 ? void 0 : firstItem.weather[0]) === null || _b === void 0 ? void 0 : _b.main) !== null && _c !== void 0 ? _c : "N/A";
        const description = (_e = (_d = firstItem === null || firstItem === void 0 ? void 0 : firstItem.weather[0]) === null || _d === void 0 ? void 0 : _d.description) !== null && _e !== void 0 ? _e : "N/A";
        const windSpeed = (_f = firstItem === null || firstItem === void 0 ? void 0 : firstItem.wind.speed.toFixed(0)) !== null && _f !== void 0 ? _f : "N/A";
        const humidity = (_g = firstItem === null || firstItem === void 0 ? void 0 : firstItem.main.humidity.toFixed(0)) !== null && _g !== void 0 ? _g : "N/A";
        const pressure = (_h = firstItem === null || firstItem === void 0 ? void 0 : firstItem.main.pressure.toFixed(0)) !== null && _h !== void 0 ? _h : "N/A";
        const icon = (_k = (_j = firstItem === null || firstItem === void 0 ? void 0 : firstItem.weather[0]) === null || _j === void 0 ? void 0 : _j.icon) !== null && _k !== void 0 ? _k : "01d";
        try {
            cityTitleEl.textContent = city;
            temperatureEl.textContent = `${temperature}°C`;
            statusEl.textContent = status;
            descriptionEl.textContent = description;
            windspeedEl.textContent = `Wind Speed: ${windSpeed} m/s`;
            humidityEl.textContent = `Humidity: ${humidity}%`;
            pressureEl.textContent = `Pressure: ${pressure} hPa`;
            iconEl.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
        }
        catch (error) {
            console.log("Error displaying weather data:", error);
        }
        forecastListEl.innerHTML = "";
        console.log(response);
        response.list.slice(1, 6).forEach((hourly) => {
            console.log(hourly.dt_txt.slice(11, 16));
            const forecastEl = createForecastElement(hourly);
            forecastListEl.appendChild(forecastEl);
        });
    });
}
function displayError(message) {
    return __awaiter(this, void 0, void 0, function* () {
        errorEl.textContent = message;
    });
}
searchFormEl.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const formData = new FormData(searchFormEl);
    const cityName = formData.get("city");
    const response = yield fetchWeatherForecast(cityName);
    if (response) {
        displayWeather(response);
    }
    else {
        displayError("We cant find that city :(");
    }
}));
fetchWeatherForecast("Jakarta").then((response) => {
    if (response) {
        displayWeather(response);
    }
    else {
        displayError("We cant find that city :(");
    }
});
setInterval(() => {
    dateEl.textContent = new Date().toDateString() + ", " + new Date().toLocaleTimeString();
}, 1000);
export {};
//# sourceMappingURL=index.js.map