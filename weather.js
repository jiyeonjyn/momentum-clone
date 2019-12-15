const API_KEY = "be6fd2d4d514775334973844b24fc0b2";
const weather = document.querySelector(".js-weather"),
    place = document.querySelector(".js-location");


function getWeather(lat, lon) {
    fetch(`
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `).then(function(response) {
        //response의 body의 내용을 가져옴
        return response.json()
    }).then(function(json) {
        console.log(json);
        weather.innerText = `${Math.round(json.main.temp)} ℃`;
        place.innerText = json.name;
    })
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