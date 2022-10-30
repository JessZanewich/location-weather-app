import './App.css';
import { useEffect, useState } from 'react';
import { Weather } from './types';
import WeatherBlock from './WeatherBlock';

const App = () => {
  const citiesList = ['ottawa', 'moscow', 'tokyo'];
  const [currentCity, setCurrentCity] = useState<string>(citiesList[0]);
  const [forecastData, setForecastData] = useState<Weather[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    /* 
      Retrieve the forecast for today and the next 4 days. 
      Utilize 2 different endpoints to confirm we return today's weather every time. 
    */
    const forecastEndpoints = [`${process.env.REACT_APP_WEATHER_URL}/weather?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`, `${process.env.REACT_APP_WEATHER_URL}/forecast?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`];

    (async () => {
      setLoading(true);
      const currentDate = new Date();
      const [todayForecast, weeklyForecast] = await Promise.all(forecastEndpoints.map((endpoint) => fetch(endpoint).then((res) => res.json())));
      const dailyForecast = weeklyForecast.list.filter((forecast: any) => {
        // Filter today's value from 5 day forecast api and only return 4 days total
        const forecastDateDay = new Date(forecast.dt * 1000).getDate();
        return currentDate.getDate() !== forecastDateDay && forecast.dt_txt.includes('12:00:00');
      }).slice(0, 4);

      setForecastData([todayForecast, ...dailyForecast]);
      setLoading(false);
    })();
  }, [currentCity]);

  return (
    <div className='app'>
      <div className='tabs'>
        {citiesList.length !== 0 && citiesList.map((city) => (
          <div key={city} className={`tabs__text ${city === currentCity && 'tabs__text--selected'}`} onClick={() => setCurrentCity(city)}>{city}</div>
        ))}
      </div>
      {forecastData && !loading && (
        <div className='grid-container'>
          <div className='grid'>
            {forecastData.length !== 0 && forecastData.map((weather) =>
              <WeatherBlock key={weather.dt} date={weather.dt} icon={weather.weather[0].icon} temperature={weather.main.temp} description={weather.weather[0].main} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
