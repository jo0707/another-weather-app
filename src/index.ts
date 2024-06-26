import { HourlyResponse, List } from "./definition"

// biar aja keekspos wkwk
const API_KEY = "83397f920b3d9223fac7762d5869250e"
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
const API_URL = "https://api.openweathermap.org/data/2.5/forecast"
// http://openweathermap.org/img/wn/{icon}.png

const cityTitleEl = document.getElementById("cityTitle") as HTMLHeadingElement
const iconEl = document.getElementById("weatherIcon") as HTMLImageElement
const temperatureEl = document.getElementById("temperature") as HTMLHeadingElement
const statusEl = document.getElementById("status") as HTMLParagraphElement
const descriptionEl = document.getElementById("description") as HTMLParagraphElement
const windspeedEl = document.getElementById("windspeed") as HTMLParagraphElement
const humidityEl = document.getElementById("humidity") as HTMLParagraphElement
const pressureEl = document.getElementById("pressure") as HTMLParagraphElement
const searchFormEl = document.getElementById("searchForm") as HTMLFormElement
const dateEl = document.getElementById("date") as HTMLParagraphElement
const errorEl = document.getElementById("error") as HTMLDivElement
const forecastListEl = document.getElementById("forecastList") as HTMLUListElement

async function fetchWeatherForecast(cityName: string, apiKey: string = API_KEY): Promise<HourlyResponse | null> {
    const endpoint = `${API_URL}/?units=metric&q=${cityName}&appid=${apiKey}`

    try {
        const response = await fetch(endpoint)

        if (!response.ok) {
            throw new Error(`Weather Fetch error! Status: ${response.status}`)
        }

        const hourlyResponse = await response.json()
        return hourlyResponse
    } catch (error) {
        console.error("Error fetching weather forecast:", error)
    }

    return null
}

function createForecastElement(hourly: List) {
    const forecastEl = document.createElement("li")
    forecastEl.classList.add("rounded", "bg-white", "bg-opacity-10", "p-4")

    const time = hourly.dt_txt.slice(11, 16)
    const temperature = hourly.main.temp.toFixed(0)
    const status = hourly.weather[0]?.main ?? "N/A"
    const icon = hourly.weather[0]?.icon ?? "01d"

    forecastEl.innerHTML = `
        <p>${time}</p>
        <img class=\"mx-auto\" src="http://openweathermap.org/img/wn/${icon}.png" alt="${status}">
        <p>${temperature}°C</p>
    `

    return forecastEl
}

async function displayWeather(response: HourlyResponse) {
    if (response.list.length === 0) return
    errorEl.textContent = ""

    const firstItem = response.list[0]
    const city = response.city.name
    const temperature = firstItem?.main.temp.toFixed(0) ?? "N/A"
    const status = firstItem?.weather[0]?.main ?? "N/A"
    const description = firstItem?.weather[0]?.description ?? "N/A"
    const windSpeed = firstItem?.wind.speed.toFixed(0) ?? "N/A"
    const humidity = firstItem?.main.humidity.toFixed(0) ?? "N/A"
    const pressure = firstItem?.main.pressure.toFixed(0) ?? "N/A"
    const icon = firstItem?.weather[0]?.icon ?? "01d"

    try {
        cityTitleEl.textContent = city
        temperatureEl.textContent = `${temperature}°C`
        statusEl.textContent = status
        descriptionEl.textContent = description
        windspeedEl.textContent = `Wind Speed: ${windSpeed} m/s`
        humidityEl.textContent = `Humidity: ${humidity}%`
        pressureEl.textContent = `Pressure: ${pressure} hPa`
        iconEl.src = `http://openweathermap.org/img/wn/${icon}@4x.png`
    } catch (error) {
        console.log("Error displaying weather data:", error)
    }

    forecastListEl.innerHTML = ""
    console.log(response)

    response.list.slice(1, 6).forEach((hourly: List) => {
        console.log(hourly.dt_txt.slice(11, 16))

        const forecastEl = createForecastElement(hourly)
        forecastListEl.appendChild(forecastEl)
    })
}

async function displayError(message: string) {
    errorEl.textContent = message
}

searchFormEl.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData(searchFormEl)
    const cityName = formData.get("city") as string
    const response = await fetchWeatherForecast(cityName)
    if (response) {
        displayWeather(response)
    } else {
        displayError("We cant find that city :(")
    }
})

fetchWeatherForecast("Jakarta").then((response) => {
    if (response) {
        displayWeather(response)
    } else {
        displayError("We cant find that city :(")
    }
})

setInterval(() => {
    dateEl.textContent = new Date().toDateString() + ", " + new Date().toLocaleTimeString()
}, 1000)
