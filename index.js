let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekDay = document.querySelector(".today");

weekDay.innerHTML = `${currentDay} ${hour}:${minutes}`;

let search = document.querySelector("#search-form");
let city = document.querySelector("h1");
function enterCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city");
  city.innerHTML = searchCity.value;
}
search.addEventListener("submit", enterCity);

//function temperature(events) {
//events.preventDefault();
//let fahTemp = document.querySelector(".unit");
//fahTemp.innerHTML = "70";
//}
//let fahrenheit = document.querySelector("#fahren");
//fahrenheit.addEventListener("click", temperature);

//function temperate(events) {
//events.preventDefault();
//let celsTemp = document.querySelector(".unit");
//celsTemp.innerHTML = "20";
//}
//let celsius = document.querySelector("#cels");
//celsius.addEventListener("click", temperate);

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}°C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#precipitation").innerHTML = Math.round(
    response.data.wind.deg
  );

  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "41315ad48d0fadfbb5809bb1f8555db0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function searchLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "41315ad48d0fadfbb5809bb1f8555db0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(position);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let tempCity = document.querySelector("#search-form");
tempCity.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Toronto");
