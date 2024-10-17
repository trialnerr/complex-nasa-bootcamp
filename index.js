import { apiKey } from './apiKey.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`;
  const facilities = document.querySelector('.facilities');

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((loc) => {
        const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=e04962555dfb41ddba0150857241710&q=${loc.city}&aqi=no`;

        fetchWeather(weatherUrl).then((weather) => console.log(weather));
        console.log(weather2);
        
        const listItem = document.createElement('li');
        listItem.textContent = `facility : ${loc.facility}, location: ${loc.city}, ${loc.state}, weather: ${weather2}`;
        facilities.appendChild(listItem);
      });
    });
});

function fetchWeather(url) {
  let weather;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
      weather = data;
      console.log('weather in fetch', weather);
      return weather;
    });
}

// async function fetchWeather(url) {
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
//   } catch (error) {

//     console.log(`ERROR: ${ error }`);
//   }
// }
