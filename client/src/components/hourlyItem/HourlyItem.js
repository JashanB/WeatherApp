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
  const iconObject = setIcon(props.icon)
  return (
    <div>
      <h2>{props.time}</h2>
      <h3>{props.temp}°C</h3>
      <h3>({props.feelsLike}°C)</h3>
      <ReactAnimatedWeather
        className={"weather-icon"}
        icon={iconObject.icon}
        size={iconObject.size}
        animate={iconObject.animate}
      />
    </div>
  )

}