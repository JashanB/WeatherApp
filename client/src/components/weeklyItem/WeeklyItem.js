import React, { useEffect, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import './WeeklyItem.css';


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
  console.log('item props', props)
  return (
    <div className="hourly-item">
      <h2>{props.day}</h2>
      <h3>High: {props.tempHigh}°C</h3>
      <h3>Low: {props.tempLow}°C</h3>
      <ReactAnimatedWeather
        className={"weather-icon"}
        icon={iconObject.icon}
        size={iconObject.size}
        animate={iconObject.animate}
      />
    </div>
  )

}