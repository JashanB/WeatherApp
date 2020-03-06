import React, { useEffect, useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import axios from 'axios';
import { Button } from 'react-bootstrap'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";
import './Search.css';

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
    // value={props.}
    />
  )
}

// const onPlacesChanged = () => {
//   const places = refs.searchBox.getPlaces(); //gets place of thing searched
//   console.log(places[0], "This is places from onPlacesChanged");
//   const bounds = new window.google.maps.LatLngBounds(); //gets boundaries for that place
//   // if (places[0].geometry) {

//   //   places.forEach(place => {

//   //     if (place.geometry.viewport) {
//   //       bounds.union(place.geometry.viewport)
//   //     } else {
//   //       bounds.extend(place.geometry.location)
//   //     }
//   //   })

//   //   if (places.length === 0) {
//   //     return;
//   //   }

//   //   const nextMarkers = places.map(place => ({
//   //     position: place.geometry.location,
//   //   }));

//   //   const nextCenter = _.get(nextMarkers, '0.position', state.center);
//   //   // setState(state => ({
//   //   //   ...state,
//   //   //   bounds: bounds,
//   //   //   center: nextCenter,
//   //   //   markers: [...state.markers, nextMarkers],
//   //   //   location: {
//   //   //     name: {
//   //   //       placeName: places[0].name, 
//   //   //       region: (places[0].address_components[2] ? places[0].address_components[2].long_name : null)
//   //   //     },
//   //   //     coordinates: {
//   //   //       lat: places[0].geometry.location.lat(), 
//   //   //       lng: places[0].geometry.location.lng()
//   //   //     }
//   //   //   }
//   //   // }))
//   // }
// }

const StandaloneSearchBox = withScriptjs((props) => {
  return (
    // <GoogleMap
    //   defaultZoom={2}
    //   center={props.center}
    //   ref={props.onMapMounted}
    //   onBoundsChanged={props.onBoundsChanged}
    // >
      <SearchBox
        ref={props.onSearchBoxMounted}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        bounds={props.bounds}
      >
        <Input suggestedState={props.suggestedState} suggestedLocation={props.suggestMarker.position} />
      {/* {(props.markers ? props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} title={marker.title} />
      ) : console.log('no marker'))} */}
    {/* // </GoogleMap> */}
      </SearchBox>
  )
}
)

export default (props) => {
  // const [directions, setDirections] = useState({ directionsArray: [] });
  // const [loaded, setLoaded] = useState("false")
  // const google = window.google

  // useEffect(() => {
   
  // }, [])
  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces(); //gets place of thing searched
    console.log(places[0], "This is places from onPlacesChanged");
    const bounds = new window.google.maps.LatLngBounds(); //gets boundaries for that place

  }
  return (<>
    <StandaloneSearchBox
      lat={41.9}
      lng={-87.624}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={onPlacesChanged}
      center={props.center}
      markers={props.markers}
      onSearchBoxMounted={onSearchBoxMounted}
      // onMapMounted={props.onMapMounted}
    />
  </>)
}
