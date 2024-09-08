function showcity(event) {
    event.preventDefault();
    let currencity = document.querySelector("#current-city-name");
    let cityinput = document.querySelector(".weather-forecast-search-place");
    currencity.innerHTML = cityinput.value;

    let city = cityinput.value;
    let apiKey = "f4850684o25d3207eb4aa74t2073f600";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(url).then(showtemperature);
}
let searchbt = document.querySelector(".weather-forecast-search");
searchbt.addEventListener("submit", showcity);


function showtemperature(response) {
    let currenttemperature = document.querySelector("#current-temperature");
    currenttemperature.innerHTML = `${Math.round(response.data.temperature.current)}°C`;

    let currentdiscription = document.querySelector("#current-weather-discription");
    currentdiscription.innerHTML = response.data.condition.description;
    
    let country = document.querySelector("#country");
    country.innerHTML = response.data.country;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.temperature.humidity}%`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed}km/h`;

    let feelslike = document.querySelector("#feels");
    feelslike.innerHTML = `${Math.round(response.data.temperature.feels_like)}°C`;

    let coordinates = document.querySelector("#coordinates");
    coordinates.innerHTML = `${response.data.coordinates.latitude}°N, ${response.data.coordinates.longitude}°E`;

    let appicon = document.querySelector("#current-weather-emoji")
    appicon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`
}


let now = new Date();
let currentyear = now.getFullYear();
let currentdate = now.getDate();

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let currentmonth = months[now.getMonth()];

let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentday = days[now.getDate()];
let weekday = document.querySelector("#current-day");
weekday.innerHTML = currentday;

let date = document.querySelector("#current-date");
date.innerHTML = `${currentdate} ${currentmonth} ${currentyear}`;


function getforecast(city){
    let apikey = `f4850684o25d3207eb4aa74t2073f600`;
    let apiurl = `https://api.shecodes.io/weather/v1/forecasr?query=${city}&key=${apikey}&units=metric`;
    axios.get(apiurl).then(showforecast);
}

function showforecast(response){
    let forecastHTML = "";
    response.data.daily.foreach(function(day, index){
        if (index < 5) {
            forecastHTML = forecastHTML + 
            `<div class="weather-forecast-day">
                <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-icon">⛅</div>
                <div class="weather-forecast-temperatures"><strong class="weather-forecast-temperature">${Math.round(day.temperature.maximum)}°</strong>
                <span class="weather-current-temperature">${Math.round(day.temperature.minimum)}°</span></div>
            </div>`;
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
}