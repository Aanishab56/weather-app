import requests

url = "https://api.open-meteo.com/v1/forecast"
params = {
    "latitude": 18.52,
    "longitude": 73.86,
    "current": "temperature_2m,relative_humidity_2m,wind_speed_10m",
}
response = requests.get(url, params=params)
print("Status code:", response.status_code)

data = response.json()
current = data["current"]
print("Temperature:", current["temperature_2m"], "°C")
print("Humidity:", current["relative_humidity_2m"], "%")
print("Wind speed:", current["wind_speed_10m"], "km/h")