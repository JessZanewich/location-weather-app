import { BlockProps } from './types';

const WeatherBlock = ({ date, icon, temperature, description }: BlockProps) => {
  const currentDate = new Date();
  const dateConvert = (date: number) => new Date(date * 1000);
  const convertedDate = dateConvert(date);
  const isToday = currentDate.getDay() === convertedDate.getDay();

  return (
    <div className='block'>
      <div className='block__text'>{isToday ? 'Today' : convertedDate.toLocaleDateString('en-US', {
        weekday: 'short',
      }).toString()}</div>
      <div className={`${isToday ? 'block__alternate' : 'block__main'}`} >
        <img className='block__img' src={`${process.env.REACT_APP_WEATHER_ICON}/${icon}.png`} />
        {isToday ? (
          <div>
            <div className='block__temp'>{Math.round(temperature)}&deg;</div>
            <div className='block__text'>{description}</div>
          </div>
        ) : (
          <div className='block__temp block__temp--center'>{Math.round(temperature)}&deg;</div>
        )}
      </div>
    </div >
  );
}

export default WeatherBlock;