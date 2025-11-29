import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const API_KEY = "baab667dadbe12fbd663e1848cf315b3";

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    try {
      setError(false);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      console.log(err.response?.data); // 🔍 Check actual error
      setError(true);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">🌤 Weather App</h1>

      <div className="flex gap-2 mb-6 w-full md:w-1/3">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-xl text-black outline-none shadow-md"
        />
        <button
          onClick={fetchWeather}
          className="bg-white bg-opacity-30 hover:bg-opacity-50 p-3 rounded-xl shadow-md transition"
        >
          <FaSearch className="text-black" />
        </button>
      </div>

      {error && <p className="text-red-200 mb-4 text-lg">City not found 😕</p>}

      {weather && (
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-xl p-6 w-full md:w-1/3 transition hover:scale-105">
          <h2 className="text-3xl font-semibold text-center mb-2 drop-shadow">
            {weather.name}, {weather.sys.country}
          </h2>

          <div className="flex justify-center items-center gap-4 my-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <h3 className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</h3>
          </div>

          <p className="text-center text-xl capitalize mb-4">{weather.weather[0].description}</p>

          <div className="grid grid-cols-2 gap-4 text-lg">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
            <p>📉 Min Temp: {weather.main.temp_min}°C</p>
            <p>📈 Max Temp: {weather.main.temp_max}°C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
