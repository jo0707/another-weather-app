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
const iconEl = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const statusEl = document.getElementById("status");
const descriptionEl = document.getElementById("description");
const windspeedEl = document.getElementById("windspeed");
const humidityEl = document.getElementById("humidity");
const pressureEl = document.getElementById("pressure");
const searchFormEl = document.getElementById("searchForm");
const errorEl = document.getElementById("error");
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
        cityTitleEl.textContent = city;
        temperatureEl.textContent = `${temperature}°C`;
        statusEl.textContent = status;
        descriptionEl.textContent = description;
        windspeedEl.textContent = `Wind Speed: ${windSpeed} m/s`;
        humidityEl.textContent = `Humidity: ${humidity}%`;
        pressureEl.textContent = `Pressure: ${pressure} hPa`;
        iconEl.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
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
export {};
//# sourceMappingURL=index.js.map