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
// import WeatherList from '../weatherList'
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
      placeholder="Customized your placeholder"
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
        // boxSizfaing: `border-box`,
        // border: `1px solid transparent`,
        // width: `240px`,
        // height: `32px`,
        // padding: `0 12px`,
        // borderRadius: `3px`,
        // boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        // fontSize: `14px`,
        // outline: `none`,
        // textOverflow: `ellipses`,
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
        {/* <Input suggestedState={props.suggestedState} suggestedLocation={props.suggestMarker.position} /> */}
        {/* {(props.markers ? props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} title={marker.title} />
      ) : console.log('no marker'))} */}
        {/* // </GoogleMap> */}
      </StandaloneSearchBox>
    </div>
  )
}
)

export default (props) => {
  const [weather, setWeather] = useState({ weather: [] });
  const [searched, setSearched] = useState({ places: [] })
  const [allPlaces, setAllPlaces] = useState({ places: [] });
  const { id } = useParams();

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
  }, [])

  // //gets weather data only for new places added 
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const weatherArray = [];
  //       const timeNow = Date.now() / 1000
  //       //want to subtract 1 year from current time and get historical data for that - globy warming
  //       //can go until get no response back from api 

  //       //wouldnt it be cool if we made a graph using historical data for that week and the "this weeks data" and plotted it
  //       for (let place of searched.places) {
  //         const weekWeatherResponse = await axios.post(`http://localhost:3001/weather/new`, {
  //           latitude: place.latitude,
  //           longitude: place.longitude
  //         })
  //         const weatherObject = {
  //           name: place.name,
  //           latitude: place.latitude,
  //           longitude: place.longitude,
  //           weatherData: JSON.parse(weekWeatherResponse.data.data)
  //         }
  //         weatherArray.push(weatherObject)
  //       }
  //       setWeather(state => ({
  //         weather: [...weather.weather, ...weatherArray]
  //       }))
  //       // const historicalWeatherResponse = await axios.post(`http://localhost:3001/weather/old`, {
  //       //   lat: coordOfSearched.coordinates.lat,
  //       //   lng: coordOfSearched.coordinates.lng,
  //       //   time: timeNow
  //       //   })
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchData()
  // }, [searched])

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
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  return (<>
    <SearchBox
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={onPlacesChanged}
      onSearchBoxMounted={onSearchBoxMounted}
    />
    {/* <WeatherList
      items={"Needs to be passed down names of places searched and weather data"}
    /> */}
  </>)
}
