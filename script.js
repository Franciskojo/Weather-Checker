const apiKey = '668ad104f91a86f05ca7d950093afe38';
const apiBaseUrl = 'http://api.weatherstack.com/current';

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weather-description');
const weatherIconElement = document.getElementById('weather-icon');
const windSpeedElement = document.getElementById('wind-speed');
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiBaseUrl}?access_key=${apiKey}&query=${city}`);
        const data = await response.json();

        if (data.current) {
            const { temperature, weather_descriptions, wind_speed, weather_icons } = data.current;
            locationElement.textContent = `Location: ${data.location.name}`;
            temperatureElement.textContent = `Temperature: ${temperature} °C`;
            weatherDescriptionElement.textContent = `Weather: ${weather_descriptions[0]}`;
            windSpeedElement.textContent = `Wind Speed: ${wind_speed} km/h`;
            weatherIconElement.src = weather_icons[0];
            weatherIconElement.classList.remove('hidden');
        } else {
            alert();
        }
    } catch (error) {
        console.error(error);
        alert();
    }
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert();
    }
});