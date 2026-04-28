// java.js

async function getWeather(lat, lon, city="Your Location"){

const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,uv_index,precipitation_probability&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

const res = await fetch(url);
const data = await res.json();

document.getElementById("cityName").innerText = city;
document.getElementById("temp").innerText = data.current.temperature_2m;
document.getElementById("humidity").innerText = data.current.relative_humidity_2m;
document.getElementById("wind").innerText = data.current.wind_speed_10m;
document.getElementById("feels").innerText = data.current.apparent_temperature;
document.getElementById("uv").innerText = data.current.uv_index;
document.getElementById("rain").innerText = data.current.precipitation_probability;
document.getElementById("direction").innerText = data.current.wind_direction_10m + "°";

document.getElementById("sunrise").innerText =
data.daily.sunrise[0].split("T")[1];

document.getElementById("sunset").innerText =
data.daily.sunset[0].split("T")[1];

loadForecast(data);
loadHourly(data);
}

function loadForecast(data){

let html="";

for(let i=0;i<7;i++){
html += `
<div class="day">
${data.daily.time[i]}<br>
🌡 ${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°
</div>
`;
}

document.getElementById("forecast").innerHTML = html;
}

function loadHourly(data){

let html="";

for(let i=0;i<8;i++){
html += `
<div class="day">
${data.hourly.time[i].split("T")[1]}<br>
${data.hourly.temperature_2m[i]}°C<br>
🌧 ${data.hourly.precipitation_probability[i]}%
</div>
`;
}

document.getElementById("hourly").innerHTML = html;
}

function getLocationWeather(){
navigator.geolocation.getCurrentPosition(pos=>{
getWeather(pos.coords.latitude,pos.coords.longitude);
});
}

async function searchCity(){

let city = document.getElementById("cityInput").value;

const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
const data = await geo.json();

if(data.results){
let lat = data.results[0].latitude;
let lon = data.results[0].longitude;
getWeather(lat,lon,city);
}
}

getLocationWeather();