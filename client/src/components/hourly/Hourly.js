import React, { useEffect, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';


const setIcon = function (icon) {
  let object = {
    icon: icon,
    size: 20,
    animate: true
  }
  return object
}

const toCelsius = function (num) {
  const temp = ((num - 32) * 5 / 9).toFixed(1)
}
//set icon

let setter = 1;
export default (props) => {
  console.log("props here", props)
  if (props.weatherData && props.weatherData.hourly) {
    const hourlyWeather = props.weatherData.hourly.data.map(function (hourly) {
      console.log("hourly", hourly)
      //format time
      const date = new Date(hourly.time * 1000)
      console.log('date', date)
      const hours = date.getHours();
      console.log('hours', hours)

      let minutes = date.getMinutes();
      if (minutes === 0) {
        minutes = "00"
      }
      console.log('minutes', minutes)

      const formattedTime = hours + ':' + minutes
      console.log(formattedTime)
      //set icon
      const iconName = hourly.icon.toUpperCase()
      const replacedName = iconName.replace(/-/g, "_")
      const iconObject = setIcon(replacedName)
      setter = 2


      return (
        <div>
          <h2>{formattedTime}</h2>
          <ReactAnimatedWeather
            className={"weather-icon"}
            icon={iconObject.icon}
            size={iconObject.size}
            animate={iconObject.animate}
          />
          <h3>{toCelsius(hourly.temperature)}°C</h3><h3>({toCelsius(hourly.apparentTemperature)}°C)</h3>
        </div>
      )
    })
  }
  return (
    <div>
      {props.weatherData && props.weatherData.hourly && setter === 2 && hourlyWeather}
    </div>)
}