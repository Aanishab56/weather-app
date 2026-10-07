const map = L.map("map").setView([20.59, 78.96], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

map.on("click", async function (event) {
  const point = event.latlng.wrap();
  const lat = point.lat;
  const lon = point.lng;

  const popup = L.popup()
    .setLatLng(event.latlng)
    .setContent("Loading weather...")
    .openOn(map);

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + lat +
    "&longitude=" + lon +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const cur = data.current;

    popup.setContent(
      "<b>" + lat.toFixed(2) + ", " + lon.toFixed(2) + "</b><br>" +
      "Temperature: " + cur.temperature_2m + " °C<br>" +
      "Humidity: " + cur.relative_humidity_2m + " %<br>" +
      "Wind: " + cur.wind_speed_10m + " km/h"
    );
  } catch (error) {
    popup.setContent("Could not load weather.");
    console.log(error);
  }
});