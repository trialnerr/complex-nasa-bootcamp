import { apiKey } from './apiKey.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`;
  const facilities = document.querySelector('.facilities');

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach(async (loc) => {
      
        const lat = loc.location.latitude; 
        const lon = loc.location.longitude; 
        const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=e04962555dfb41ddba0150857241710&q=${lat} ${lon}&aqi=no`;

        const weather = await fetchWeather(weatherUrl); 
        const currWeatherCondition = weather.current.condition.text;
        const tempInF = weather.current.temp_f;
        console.log('weatherText', weather.current.condition.text); 
        console.log('weatherText', weather.current.temp_f)

        const listItem = document.createElement('li');

        const facilityH2 = document.createElement('h2')
        facilityH2.textContent = `${loc.facility}`; 

        const locPara = document.createElement('p'); 
        locPara.textContent = `location: ${loc.city}, ${loc.state}`;

        const weatherPara = document.createElement('p'); 
        weatherPara.textContent = `${currWeatherCondition}, temp: ${tempInF}°F`;

        listItem.append(facilityH2, locPara, weatherPara);
        facilities.appendChild(listItem);
      });
    });
});


async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {

    console.log(`ERROR: ${ error }`);
  }
}
