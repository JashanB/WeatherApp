import React, { useEffect, useState } from 'react'
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const toCelsius = function (num) {
	const temp = ((num - 32) * 5 / 9).toFixed(1)
	return parseFloat(temp)
}

const convertTime = function (time) {
	const date = new Date(time * 1000)
	const formattedTime = date.toDateString();
	const slicedTime = formattedTime.slice(4, 10)
	return slicedTime
}

const getYear = function (year) {
	const date = new Date(year * 1000)
	const time = date.getFullYear().toString();
	return time
}

export default (props) => {
	const data = [];
	const currentDate = new Date(props.weatherData.daily.data[0].time * 1000)
	const currentTime = currentDate.getFullYear().toString();
	const currentData = props.weatherData.daily.data.map(function (day) {
		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
		const humanTime = convertTime(day.time)
		// const dataObject = { x: humanTime, y: averageTemp }
		const dataObject = { y: averageTemp, label: humanTime }
		return dataObject
	})
	const currentObject = {
		type: "spline",
		name: currentTime,
		showInLegend: true,
		dataPoints: currentData
	}
	data.push(currentObject)
	//iterate through historical data to push objects into data array 
	if (props.historicalData.hisWeather) {
		for (let year of Object.keys(props.historicalData.hisWeather)) {
			const historicalYear = getYear(props.historicalData.hisWeather[year][0].time);
			const dataArray = props.historicalData.hisWeather[year].map(function (day) {
				const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
				const humanTime = convertTime(day.time)
				const dataObject = { y: averageTemp, label: humanTime }
				return dataObject
			})
			let obj = {
				type: "spline",
				name: historicalYear,
				dataPoints: dataArray
			};
			data.push(obj)
		}
	}
	console.log('graph', currentData)
	console.log('dataArray', data)
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["1"]) {
	// 	const minus1 = props.historicalData.hisWeather["1"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["2"]) {
	// 	const minus2 = props.historicalData.hisWeather["2"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["3"]) {
	// 	const minus3 = props.historicalData.hisWeather["3"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["4"]) {
	// 	const minus4 = props.historicalData.hisWeather["4"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["5"]) {
	// 	const minus5 = props.historicalData.hisWeather["5"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["6"]) {
	// 	const minus6 = props.historicalData.hisWeather["6"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["7"]) {
	// 	const minus7 = props.historicalData.hisWeather["7"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["8"]) {
	// 	const minus8 = props.historicalData.hisWeather["8"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["9"]) {
	// 	const minus9 = props.historicalData.hisWeather["9"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	// if (props.historicalData.hisWeather && props.historicalData.hisWeather["10"]) {
	// 	const minus10 = props.historicalData.hisWeather["10"].map(function (day, index) {
	// 		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
	// 		const humanTime = convertTime(day.time)
	// 		const dataObject = { y: averageTemp, label: humanTime }
	// 		return dataObject
	// 	})
	// }
	const options = {
		animationEnabled: true,
		title: {
			text: "Temperature Over Time"
		},
		axisY: {
			title: "Temperature (°C)",
			includeZero: false
		},
		toolTip: {
			shared: false
		},
		data: data
	}
	return (
		<div>
			<CanvasJSChart
			options={options}
			// {/* /* onRef={ref => this.chart = ref} */ */}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
	);

}
