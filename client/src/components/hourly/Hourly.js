import React, { useEffect, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import HourlyItem from "../hourlyItem"
import './Hourly.css';


const toCelsius = function (num) {
  const temp = ((num - 32) * 5 / 9).toFixed(1)
  return temp
}
//set icon

export default (props) => {
  const hourlyWeather = props.weatherData.hourly.data.map(function (hourly, index) {
    //format time
    let ifFirst = false;
    index === 0 ? ifFirst = true : ifFirst = false;
    const date = new Date(hourly.time * 1000);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes === 0) {
      minutes = "00"
    }
    const formattedTime = hours + ':' + minutes;
    //set icon
    const iconName = hourly.icon.toUpperCase()
    const replacedName = iconName.replace(/-/g, "_")
    return (<HourlyItem
          key={index}
          ifFirst={ifFirst}
          time={formattedTime}
          temp={toCelsius(hourly.temperature)}
          feelsLike={toCelsius(hourly.apparentTemperature)}
          icon={replacedName}
        />
    )
  })
  return (
    <div className="hourly-list">
      {hourlyWeather}
    </div>)
}