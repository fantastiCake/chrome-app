
const OPENWEATHER_API_KEY = "3632758d678240b2291921ea3546f1f3";
const COORDS_LS_KEY = "coords";

let coordsObject = {};

function handleGeoSuccess(position, callback) {
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    coordsObject = {
        latitude,
        longitude
    }
    localStorage.setItem(COORDS_LS_KEY, JSON.stringify(coordsObject));
    callback(coordsObject);
}

function handleGeoError(error) {
    console.warn(`ERROR ${error.code}: ${error.message}`);
}

function makeWeatherText(weather) {
    return `${weather.temp}⁰C ${weather.description} ${weather.city} (${weather.country})`;
}

function setWeatherByCoords(coords) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temp = json.main.temp;
        const city = json.name;
        const country = json.sys.country;
        const description = json.weather[0].description;
        const weather = {
            temp,
            description,
            city,
            country
        }

        const weatherArea = document.querySelector(".weather-area");
        const formedWeather = makeWeatherText(weather);
        weatherArea.innerText = formedWeather;
    });
}

function setWeather() {
    if(localStorage.getItem(COORDS_LS_KEY) == null) {
        geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(function (position) {
            handleGeoSuccess(position, setWeatherByCoords);
        }, handleGeoError);
    }
    else {
        const coords = JSON.parse(localStorage.getItem(COORDS_LS_KEY));
        setWeatherByCoords(coords);
    }
}

function init() {
    setWeather();
}

init();