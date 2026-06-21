// Weather Dashboard - Using wttr.in (Free, No API Key)

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

async function getWeather(city) {
    if (!city) {
        errorMessage.textContent = '⚠️ Please enter a city name';
        return;
    }

    try {
        errorMessage.textContent = '';
        weatherInfo.innerHTML = '<div class="weather-card"><p>⏳ Loading...</p></div>';

        // Use wttr.in API (no key required!)
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        // Extract data
        const weatherData = {
            name: data.nearest_area[0].areaName[0].value,
            temp: data.current_condition[0].temp_C,
            humidity: data.current_condition[0].humidity,
            desc: data.current_condition[0].weatherDesc[0].value,
            wind: data.current_condition[0].windspeedKmph
        };

        displayWeather(weatherData);

    } catch (error) {
        errorMessage.textContent = '⚠️ City not found. Please try again.';
        weatherInfo.innerHTML = `
            <div class="weather-card">
                <p style="color: #666;">❌ No weather data available</p>
                <p style="color: #999; font-size: 0.9rem;">Try: London, New York, Accra</p>
            </div>
        `;
    }
}

function displayWeather(data) {
    weatherInfo.innerHTML = `
        <div class="weather-card">
            <h2>${data.name}</h2>
            <p id="temperature">${data.temp}°C</p>
            <p id="weatherDescription">${data.desc}</p>
            <div class="weather-details">
                <div>
                    <p>💧 Humidity</p>
                    <p id="humidity">${data.humidity}%</p>
                </div>
                <div>
                    <p>💨 Wind Speed</p>
                    <p id="windSpeed">${data.wind} km/h</p>
                </div>
            </div>
        </div>
    `;
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Welcome message
window.addEventListener('DOMContentLoaded', () => {
    weatherInfo.innerHTML = `
        <div class="weather-card">
            <p style="color: #666;">🌍 Enter a city to get real weather data</p>
            <p style="color: #999; font-size: 0.9rem;">Try: London, New York, Accra, Tokyo</p>
        </div>
    `;
});