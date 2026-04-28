const apiKey = "6f49b0d372e46afd7003341110fe5c01";

function getLocation() {
  navigator.geolocation.getCurrentPosition(success, error);
}

async function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  document.getElementById("temp").innerText = data.main.temp + " °C";
  document.getElementById("hum").innerText = data.main.humidity + " %";
  document.getElementById("wind").innerText = data.wind.speed + " km/h";
  document.getElementById("rain").innerText = data.weather[0].main;
}

function error() {
  alert("Location access denied!");
}

getLocation();