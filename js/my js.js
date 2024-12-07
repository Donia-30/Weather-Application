document.addEventListener('DOMContentLoaded', function() {
    //display cairo when user doese not  insert city
    getWeatherByCity('Cairo');
});

// update getWeather 
document.getElementById('city-input').addEventListener('input', getWeather);

function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    
    if (city === "") {
        // defult city
        getWeatherByCity('Cairo');
    } else {
        // display city 
        getWeatherByCity(city);
    }
}

// getWeatherByCity
function getWeatherByCity(city) {
    const apiKey = 'c6d14833fe5749aaaff113032240612';  //  my API
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&lang=ar`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                clearWeatherData();
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            clearWeatherData();
            console.error('Error fetching weather data', error);
        });
}

// weather by location
function getWeatherByCoordinates(lat, lon) {
    const apiKey = 'c6d14833fe5749aaaff113032240612';  //my API  
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3&lang=ar`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                clearWeatherData();
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            clearWeatherData();
            console.error('Error fetching weather data', error);
        });
}

// display weather
function displayWeather(data) {
    const forecast = data.forecast.forecastday;
    const location = data.location;

    //update card day1
    updateCard('.day1', forecast[0], location, getDayName(forecast[0].date));

    // update card day2
    updateCard('.day2', forecast[1], location, getDayName(forecast[1].date));

    // update card day3
    updateCard('.day3', forecast[2], location, getDayName(forecast[2].date));
}

// update card
function updateCard(cardClass, dayData, location, dayName) {
    const card = document.querySelector(cardClass);

    //city name
    card.querySelector('.location').textContent = location.name;

    // date
    card.querySelector('.date').textContent = dayName + ", " + formatDate(dayData.date);

    //    tempreture,condition
    card.querySelector('.temp').textContent = `${dayData.day.avgtemp_c}°C`;
    card.querySelector('.condition').textContent = dayData.day.condition.text;

    // sun,moon
    const isDay = dayData.day.is_day;
    const icon = isDay ? '🌞' : '🌙';  
    card.querySelector('.day-night').textContent = icon;
}

// day by date
function getDayName(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
}

// display date
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;  
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
