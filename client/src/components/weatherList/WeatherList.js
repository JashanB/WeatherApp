import React from 'react';
import WeatherListItem from '../weatherListItem';
// import Button from '../weatherListItem'
import './WeatherList.css';

export default (props) => {
  const places = props.weatherData.weather.map(place => <WeatherListItem
    key={place.id}
    id={place.id}
    userId={props.userId}
    name={place.name}
    currentTemp={place.weatherData.currently.temperature}
    feelsLike={place.weatherData.currently.apparentTemperature}
    icon={place.weatherData.currently.icon}
    hourly={place.weatherData.hourly}
    daily={place.weatherData.daily}
    deletePlace={props.deletePlace}
  // setAllPLaces={props.setAllPLaces}
  // allPlaces={props.allPlaces}
  />)

  return (
    <div className="unorganized-list">
      <ul>
        {props.weatherData.weather && props.weatherData.weather.length > 0 && props.userId && places}
      </ul>
    </div>
  )
}