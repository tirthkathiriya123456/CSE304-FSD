import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '71e8c7942caa44aa8ad93912253006'; // Replace with your actual API key from weatherapi.com

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error('City not found.');
      }

      const data = await response.json();
      setWeather({
        name: data.location.name,
        temp: data.current.temp_c,
        condition: data.current.condition.text
      });
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h2>Enter City</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter name of City"
      />
      <br />
      <button onClick={getWeather}>Get Weather Detail</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;
