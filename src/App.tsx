import './App.css';
import { useEffect, useState } from "react";
import { Weather } from './types';
import WeatherBlock from './WeatherBlock';

const App = () => {
  const citiesList = ['ottawa', 'moscow', 'tokyo'];
  const [city, setCity] = useState(citiesList[0]);
  const [dataToday, setDataToday] = useState<Weather>();
  const [data, setData] = useState<Weather[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_WEATHER_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => setDataToday(result));
    }
    fetchData();
  }, [city]);

  const fetchWeather = async (selectedCity: string) => {
    await fetch(`${process.env.REACT_APP_WEATHER_URL}/forecast?q=${selectedCity}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        const dailyForecast = result.list.filter((forecast: any) => forecast.dt_txt.includes('12:00:00')).slice(0, 4);
        setData(dailyForecast);
      });
    setCity(selectedCity);
  }

  return (
    <div className="App">
      <div className='tabs'>
        {citiesList.length !== 0 && citiesList.map((city) => (
          <div className="tabs__text" onClick={() => fetchWeather(city)}>{city}</div>
        ))}
      </div>
      {data && (
        <div className='grid'>
          {dataToday && (
            <div className="grid-child">
              <WeatherBlock date={dataToday.dt} icon={dataToday.weather[0].icon} temperature={dataToday.main.temp} />
            </div>
          )}
          {data.length !== 0 && data.map((weather) =>
            <WeatherBlock date={weather.dt} icon={weather.weather[0].icon} temperature={weather.main.temp} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
