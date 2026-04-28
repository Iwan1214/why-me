const apiKey = "6f49b0d372e46afd7003341110fe5c01";
const city = "Putrajaya";

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("temp").innerText = data.main.temp + " °C";
    document.getElementById("hum").innerText = data.main.humidity + " %";
    document.getElementById("wind").innerText = data.wind.speed + " km/h";
    document.getElementById("rain").innerText = data.weather[0].main;

  } catch (error) {
    console.log("Error loading weather:", error);
  }
}

getWeather();
setInterval(getWeather, 60000);