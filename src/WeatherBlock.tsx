import { BlockProps } from './types';

const WeatherBlock = ({ date, icon, temperature }: BlockProps) => {
  const dateConvert = (date: number) => new Date(date * 1000);


  return (
    <div className="block">
      <div className='block__text'>{dateConvert(date).toLocaleDateString('en-US', {
        weekday: 'short',
      }).toString()}</div>
      <img className="block__img" src={`${process.env.REACT_APP_WEATHER_ICON}/${icon}.png`} />
      <div className='block__temp'>{Math.round(temperature)}&deg;</div>
    </div>
  );
}

export default WeatherBlock;