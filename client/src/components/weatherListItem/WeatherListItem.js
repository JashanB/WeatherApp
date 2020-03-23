import React, { useEffect, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';




const setIcon = function (icon) {
  let object = {
    icon: icon,
    size: 20,
    animate: true
  }
  return object
}

const Button = (props) => {
  return (
    <IconButton>
    <DeleteIcon className={"card-delete-icon"} 
     className={"delete-point-button"}
     onClick={() => {props.deletePlace(props.id)}}/>
  </IconButton>
    
  )
}
export default (props) => {
  //convert to celsius 
  const currentTemp = ((props.currentTemp - 32) * 5 / 9).toFixed(1)
  const apparentTemp = ((props.feelsLike - 32) * 5 / 9).toFixed(1)
  //set icon
  const iconName = props.icon.toUpperCase()
  const replacedName = iconName.replace(/-/g, "_")
  const iconObject = setIcon(replacedName)
  console.log('item', props.userId)
  console.log('key', props.id)

  return (
    <a href={`http://localhost:3000/users/${props.userId}/places/${props.id}`}>
      <div className="weather-item">
        <h2>{props.name}</h2>
        <ReactAnimatedWeather
          className={"weather-icon"}
          icon={iconObject.icon}
          size={iconObject.size}
          animate={iconObject.animate}
        />
        <h3>{currentTemp}°C</h3><h3>Feels Like {apparentTemp}°C</h3>
      </div>
    </a>
  )
}