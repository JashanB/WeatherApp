import React, { useEffect, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import HourlyItem from "../hourlyItem"
import './Weekly.css';

const toCelsius = function (num) {
  const temp = ((num - 32) * 5 / 9).toFixed(1)
  return temp
}
//set icon

export default (props) => {
  console.log("props here", props)
    const weeklyWeather = props.weatherData.daily.data.map(function (day, index) {
      //format time
      const date = new Date(day.time * 1000)
      const formattedTime = date.toDateString();
      //set icon
      const iconName = hourly.icon.toUpperCase()
      const replacedName = iconName.replace(/-/g, "_")
      // const iconObject = setIcon(replacedName)
      return ( <WeeklyItem 
      key={index}
      day={formattedTime}
      tempHigh={toCelsius(day.temperatureHigh)}
      tempLow={toCelsius(day.temperatureLow)}
      icon={replacedName}
      />
      )
    })
  return (
    <ul className="weekly-list">
      {weeklyWeather}
    </ul>)
}