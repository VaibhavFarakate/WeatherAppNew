import React, { useState } from 'react';

const WeatherCard = ({ city, temperature, min_Temp, max_Temp, weatherDescription }) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{city}</h5>
            <hr />
            <p className="card-text">Temperature: {temperature} K</p>
            <p className="card-text">Min-Temp.: {min_Temp}</p>
            <p className="card-text">Max-Temp.: {max_Temp}</p>
            <p className="card-text">Weather: {weatherDescription}</p>
        </div>
    </div>
);

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https:api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dbd907bd55ff95f3c244f283f6b1c272`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // Log the fetched data for debugging purposes
            setWeatherData(data);
        } catch (error) {
            console.log("Error fetching weather data:", error);
        }
    };

    const handleSearch = () => {
        fetchWeatherData();
    };

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
            </div>
            {weatherData && (
                <WeatherCard
                    city={weatherData.name}
                    temperature={weatherData.main.temp}
                    min_Temp={weatherData.main.temp_min}
                    max_Temp={weatherData.main.temp_max}
                    weatherDescription={weatherData.weather[0].description}
                />
            )}
        </div>
    );
};

export default Weather;