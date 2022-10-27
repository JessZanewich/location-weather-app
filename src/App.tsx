import './App.css';
import { useEffect, useState } from "react";

interface Weather {
  main: any,
  weather: Array<any>,
  name: string,
  coord: any
}

const App = () => {
  const [city, setCity] = useState('calgary');
  const [data, setData] = useState<Weather[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_WEATHER_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
        });
    }
    fetchData();
  }, [city]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_WEATHER_URL}/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          const dailyForecast = result.list.filter((forecast: any) => { console.log(forecast.dt_txt.includes('12:00:00')); return forecast.dt_txt.includes('12:00:00'); });
          setData(dailyForecast);
        });
    }
    fetchData();
  }, [city]);

  return (
    <div className="App">
      <div>
        <div onClick={() => setCity('ottawa')}>Ottawa</div>
        <div onClick={() => setCity('moscow')}>Moscow</div>
        <div onClick={() => setCity('tokyo')}>Tokyo</div>
      </div>
      {data && (
        <div>
          <div>Today</div>
          <img src={`${process.env.REACT_APP_WEATHER_ICON}/03d.png`} />
          {data.length !== 0 && data.map((weather) =>
            <div>{Math.round(weather.main.temp)}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
