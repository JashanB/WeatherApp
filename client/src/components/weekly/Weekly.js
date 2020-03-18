import React, { useEffect, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import HourlyItem from "../hourlyItem"
import './Weekly.css';
import WeeklyItem from "../weeklyItem"

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
      console.log('time', formattedTime)
      //set icon
      const iconName = day.icon.toUpperCase()
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
    <li className="weekly-list">
      {weeklyWeather}
    </li>)
}