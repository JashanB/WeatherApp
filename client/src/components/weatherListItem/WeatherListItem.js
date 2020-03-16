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

export default (props) => {
  //convert to celsius 
  const currentTemp = (props.currentTemp - 32) * 5/9
  const apparentTemp = (props.feelsLike - 32) * 5/9
  //set icon
  const iconName = props.icon.toUpperCase()
  const replacedName = iconName.replace(/-/g, "_")
  const iconObject = setIcon(replacedName)

  return (
    <div className="weather-item">
      <h2>{props.name}</h2>
      <ReactAnimatedWeather
        className={"weather-icon"}
        icon={iconObject.icon}
        size={iconObject.size}
        animate={iconObject.animate} 
        /> 
      <h3>{currentTemp}</h3>
      <h3>{apparentTemp}</h3>
    </div>
  )
}