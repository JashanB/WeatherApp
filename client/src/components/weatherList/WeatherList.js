import React, { useEffect, useState } from 'react'
import WeatherListItem from '../weatherListItem'

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
    />)

    return (
      <ul>
        {places}
      </ul>
    )
}