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

const currentTemp = ((props.currentTemp - 32) * 5 / 9).toFixed(1)
const apparentTemp = ((props.feelsLike - 32) * 5 / 9).toFixed(1)
//set icon


export default (props) => {
  const hourlyWeather = props.weatherData.hourly.data.map(function (hourly) {
    //format time
    const date = new Date(hourly.time * 1000)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = hours + ':' + minutes.substr(-2)
    //set icon
    const iconName = hourly.icon.toUpperCase()
    const replacedName = iconName.replace(/-/g, "_")
    const iconObject = setIcon(replacedName)

    

    return (
      <div>
        <ReactAnimatedWeather
          className={"weather-icon"}
          icon={iconObject.icon}
          size={iconObject.size}
          animate={iconObject.animate}
        />
      </div>
    )
  })
  return (
    <div>

    </div>)
}