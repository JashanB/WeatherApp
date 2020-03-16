import React, { useEffect, useState } from 'react'

export default (props) => {
  const places = props.weatherData.weather.map(place => <WeatherListItem
    name={place.name}
    currentTemp={place.weatherData.currently.temperature} 
    feelsLike={place.weatherData.currently.apparentTemperature} 
    icon={place.weatherData.currently.icon}
    hourly={place.weatherData.hourly}
    daily={place.weatherData.daily}
    />)

    return (
      <ul>
        places
      </ul>
    )
}