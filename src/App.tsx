import './App.css';
import { useEffect, useState } from "react";
import { Weather } from './types';
import WeatherBlock from './WeatherBlock';

const App = () => {
  const citiesList = ['ottawa', 'moscow', 'tokyo'];
  const [currentCity, setCurrentCity] = useState<string>(citiesList[0]);
  const [forecastData, setForecastData] = useState<Weather[]>();

  useEffect(() => {
    let forecastData = [];
    const forecastEndpoints = [`${process.env.REACT_APP_WEATHER_URL}/weather?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`, `${process.env.REACT_APP_WEATHER_URL}/forecast?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`];

    const getForecast = async () => {
      const [todayForecast, weeklyForecast] = await Promise.all(forecastEndpoints.map((endpoint) => fetch(endpoint).then((res) => res.json())));
      const dailyForecast = weeklyForecast.list.filter((forecast: any) => forecast.dt_txt.includes('12:00:00')).slice(0, 4);

      setForecastData([todayForecast, ...dailyForecast]);
    }
    getForecast();
  }, [currentCity]);

  return (
    <div className="App">
      <div className='tabs'>
        {citiesList.length !== 0 && citiesList.map((city) => (
          <div className={`tabs__text ${city === currentCity && 'tabs__text--selected'}`} onClick={() => setCurrentCity(city)}>{city}</div>
        ))}
      </div>
      {forecastData && (
        <div className='grid-container'>
          <div className='grid'>
            {forecastData.length !== 0 && forecastData.map((weather) =>
              <WeatherBlock date={weather.dt} icon={weather.weather[0].icon} temperature={weather.main.temp} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
