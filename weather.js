const API_KEY = "be6fd2d4d514775334973844b24fc0b2";
const weather = document.querySelector(".js-weather"),
    place = document.querySelector(".js-location");

function insertIcon(iconCode) {
    const icon = document.createElement("span");
    switch(iconCode) {
        case "01d":
            icon.innerHTML=`<i class="fas fa-sun"></i>`;
            break;
        case "01n":
            icon.innerHTML=`<i class="fas fa-moon"></i>`;
            break;
        case "02d":
            icon.innerHTML=`<i class="fas fa-cloud-sun"></i>`;
            break;
        case "02n":
            icon.innerHTML=`<i class="fas fa-cloud-moon"></i>`;
            break;
        case "03d": case "03n": case "04d": case "04n":
            icon.innerHTML=`<i class="fas fa-cloud"></i>`;
            break;
        case "09d": case "09n":
            icon.innerHTML=`<i class="fas fa-cloud-showers-heavy"></i>`;
            break;
        case "10d":
            icon.innerHTML=`<i class="fas fa-cloud-sun-rain"></i>`;
            break;
        case "10n":
            icon.innerHTML=`<i class="fas fa-cloud-moon-rain"></i>`;
            break;
        case "11d": case "11n":
            icon.innerHTML=`<i class="fas fa-bolt"></i>`;
            break;
        case "13d": case "13n":
            icon.innerHTML=`<i class="far fa-snowflake"></i>`;
            break;
        case "50d": case "50n":
            icon.innerHTML=`<i class="fas fa-smog"></i>`;
            break;
        default :
    }
    weather.prepend(icon);
}

function getWeather(lat, lon) {
    fetch(`
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `).then(function(response) {
        //response의 body의 내용을 가져옴
        return response.json();
    }).then(function(json) {
        console.log(json);
        weather.innerHTML = 
            //<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}.png" alt="">
            `<span>${Math.round(json.main.temp)}</span>℃`;
        place.innerText = json.name;
        insertIcon(json.weather[0].icon);
    });
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, function handleGeoError() {
        console.log("can't access geo location");
    });
}

function handleGeoSuccess(position) {
    const longitude =  position.coords.longitude;
    const latitude = position.coords.latitude;
    const coordsObj = {
        longitude,
        latitude
    }
    localStorage.setItem("coords", JSON.stringify(coordsObj));
    loadCoords();
}

function loadCoords() {
    const coords = localStorage.getItem("coords");
    if (coords) {
        const parsedCoords = JSON.parse(coords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    } else {
        askForCoords();
    }
}

function init() {
    loadCoords();
}

init();