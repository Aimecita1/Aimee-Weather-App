function formatDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour <= 9) {
    hour = "0" + hour;
  }
  let minutes = now.getMinutes();
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  return `${day}, ${hour}:${minutes}`;
}

function search(city) {
  let units = "metric";
  let apiKey = "98980a45697353d2d771a3c81708573c";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${weatherURL}&appid=${apiKey}`).then(showTemperature);
}

function isCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let timeFormat = document.querySelector("#date");
let now = new Date();
timeFormat.innerHTML = formatDate(now);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", isCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "98980a45697353d2d771a3c81708573c";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${weatherURL}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Ponce");
