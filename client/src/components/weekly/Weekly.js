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
  console.log("props here", props)
    const hourlyWeather = props.weatherData.hourly.data.map(function (hourly, index) {
      //format time
      const date = new Date(hourly.time * 1000)
      const hours = date.getHours();
      let minutes = date.getMinutes();
      if (minutes === 0) {
        minutes = "00"
      }
      const formattedTime = hours + ':' + minutes
      //set icon
      const iconName = hourly.icon.toUpperCase()
      const replacedName = iconName.replace(/-/g, "_")
      // const iconObject = setIcon(replacedName)
      return ( <HourlyItem 
      key={index}
      time={formattedTime}
      temp={toCelsius(hourly.temperature)}
      feelsLike={toCelsius(hourly.apparentTemperature)}
      icon={replacedName}
      />
      )
    })
  return (
    <ul className="hourly-list">
      {props.name}
      {hourlyWeather}
    </ul>)
}