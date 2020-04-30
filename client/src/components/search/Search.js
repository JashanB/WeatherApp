import React, { useEffect, useState } from 'react'
import { withScriptjs } from "react-google-maps"
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";
import './Search.css';
import WeatherList from '../weatherList'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const refs = {}; //google map element 
const onSearchBoxMounted = (ref) => {
  refs.searchBox = ref;
}

const Input = (props) => {
  return (
    <input
      type="text"
      id="searchTerm"
      placeholder="Search for your location"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        marginTop: `27px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
      }}
    />
  )
}

const SearchBox = withScriptjs((props) => {

  return (
    <div className="stand-alone-search">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        bounds={props.bounds}
      >
        <Input />
      </StandaloneSearchBox>
    </div>
  )
}
)

export default (props) => {
  const [weather, setWeather] = useState({ weather: [] });
  const [onRender, setOnRender] = useState({ places: [] })
  const [allPlaces, setAllPlaces] = useState({ places: [] });
  const [ifDeleted, setIfDeleted] = useState({ deleted: [] });
  const { id } = useParams();

  const deletePlace = function (placeId) {
    axios.delete(`http://localhost:3001/users/${id}/places/${placeId}`)
      .then((res) => {
        const placeMinus = allPlaces.places.filter(place => place.id !== placeId)
        console.log('place minus', placeMinus)
        const weatherMinus = weather.weather.filter(place => place.id !== placeId)
        console.log('weather minus', weatherMinus)

        setAllPlaces(state => ({ places: placeMinus }))
        setWeather(state => ({ weather: weatherMinus }))
        // setIfDeleted(state => ({ deleted: [...ifDeleted.deleted, placeId] }))
      })
  }

  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces(); //gets place of thing searched
    console.log(places[0], "This is places from onPlacesChanged");
    async function insertData() {
      try {
        const placesData = await axios.post(`http://localhost:3001/users/${id}/places`, {
          user_id: id,
          name: places[0].name,
          latitude: places[0].geometry.location.lat(),
          longitude: places[0].geometry.location.lng()
        })
        const weekWeatherResponse = await axios.post(`http://localhost:3001/weather/new`, {
          latitude: places[0].geometry.location.lat(),
          longitude: places[0].geometry.location.lng()
        })
        const placesObject = {
          name: places[0].name,
          id: placesData.data.place.id,
          latitude: places[0].geometry.location.lat(),
          longitude: places[0].geometry.location.lng()
        }
        const weatherObject = {
          name: places[0].name,
          id: placesData.data.place.id,
          latitude: places[0].geometry.location.lat(),
          longitude: places[0].geometry.location.lng(),
          weatherData: JSON.parse(weekWeatherResponse.data.data)
        }
        setAllPlaces(state => ({
          places: [...allPlaces.places, placesObject]
        }))
        // setSearched(state => ({
        //   places: [...searched.places, placesObject]
        // }))
        setWeather(state => ({
          weather: [...weather.weather, weatherObject]
        }))
      } catch (error) {
        console.error(error)
      }
    }
    insertData();
  }
  setTimeout(function () {
    console.log('this is state', allPlaces)
    console.log('this is weather', weather)
  }, 5000)

  useEffect(() => {
    async function fetchData() {
      try {
        const placesArray = [];
        const placesData = await axios.get(`http://localhost:3001/users/${id}`)
        for (let place of placesData.data.places) {
          const placeObject = {
            name: place.name,
            id: place.id,
            latitude: parseFloat(place.latitude),
            longitude: parseFloat(place.longitude)
          }
          placesArray.push(placeObject)
        }
        setAllPlaces(state => ({
          places: [...allPlaces.places, ...placesArray]
        }))
        setOnRender(state => ({
          places: [...allPlaces.places, ...placesArray]
        }))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])
  //gets weather data for all places in database on load
  useEffect(() => {
    async function fetchData() {
      try {
        const weatherArray = [];
        const timeNow = Date.now() / 1000
        //want to subtract 1 year from current time and get historical data for that - globy warming
        //can go until get no response back from api 

        //wouldnt it be cool if we made a graph using historical data for that week and the "this weeks data" and plotted it
        for (let place of allPlaces.places) {
          const weekWeatherResponse = await axios.post(`http://localhost:3001/weather/new`, {
            latitude: place.latitude,
            longitude: place.longitude
          })
          const weatherObject = {
            name: place.name,
            id: place.id,
            latitude: place.latitude,
            longitude: place.longitude,
            weatherData: JSON.parse(weekWeatherResponse.data.data)
          }
          weatherArray.push(weatherObject)
        }
        setWeather(state => ({
          weather: weatherArray
        }))
        // const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
        //   lat: coordOfSearched.coordinates.lat,
        //   lng: coordOfSearched.coordinates.lng,
        //   time: timeNow
        //   })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [onRender])

  return (<div className={"search-page-container"}>
    <div className={"search-box"}>
      <SearchBox
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        onPlacesChanged={onPlacesChanged}
        onSearchBoxMounted={onSearchBoxMounted}
      />
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </div>
    <div className={"weather-list-container"}>
      {allPlaces.places && allPlaces.places.length > 0 && weather.weather && weather.weather.length > 0 && <WeatherList
        // items={"Needs to be passed down names of places searched and weather data"}
        userId={id}
        weatherData={weather}
        deletePlace={deletePlace}
      // setAllPlaces={setAllPlaces}
      // allPlaces={allPlaces}
      />}
    </div>
  </div>)
}
