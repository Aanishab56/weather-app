import { useState } from "react";
import { MapContainer, TileLayer, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function WeatherClick() {
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle");

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng.wrap();
      setPlace({ position: e.latlng, lat: lat, lon: lng });
      setStatus("loading");

      try {
        const url =
          "https://api.open-meteo.com/v1/forecast" +
          `?latitude=${lat}&longitude=${lng}` +
          "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

        const response = await fetch(url);
        const data = await response.json();
        setWeather(data.current);
        setStatus("done");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    },
  });

  if (!place) return null;

  return (
    <Popup key={place.lat + "," + place.lon} position={place.position}>
      <b>
        {place.lat.toFixed(2)}, {place.lon.toFixed(2)}
      </b>
      <br />
      {status === "loading" && "Loading weather..."}
      {status === "error" && "Could not load weather."}
      {status === "done" && weather && (
        <>
          Temperature: {weather.temperature_2m} °C
          <br />
          Humidity: {weather.relative_humidity_2m} %
          <br />
          Wind: {weather.wind_speed_10m} km/h
        </>
      )}
    </Popup>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Weather Map Dashboard</h1>
      <MapContainer center={[20.59, 78.96]} zoom={5} className="map">
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <WeatherClick />
      </MapContainer>
    </div>
  );
}

export default App;