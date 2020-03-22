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

export default (props) => {
	let setNumber = props.pastYears
	const currentDate = new Date(props.weatherData.daily.data[0].time * 1000)
	const currentTime = currentDate.getFullYear()
	const currentData = props.weatherData.daily.data.map(function (day) {
		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
		const humanTime = convertTime(day.time)
		// const dataObject = { x: humanTime, y: averageTemp }
		const dataObject = { y: averageTemp, label: humanTime }
		return dataObject
	})
	console.log('graph', currentData)
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["1"]) {
		const minus1 = props.historicalData.hisWeather["1"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["2"]) {
		const minus2 = props.historicalData.hisWeather["2"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["3"]) {
		const minus3 = props.historicalData.hisWeather["3"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["4"]) {
		const minus4 = props.historicalData.hisWeather["4"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["5"]) {
		const minus5 = props.historicalData.hisWeather["5"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["6"]) {
		const minus6 = props.historicalData.hisWeather["6"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["7"]) {
		const minus7 = props.historicalData.hisWeather["7"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["8"]) {
		const minus8 = props.historicalData.hisWeather["8"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["9"]) {
		const minus9 = props.historicalData.hisWeather["9"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather && props.historicalData.hisWeather["10"]) {
		const minus10 = props.historicalData.hisWeather["10"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const humanTime = convertTime(day.time)
			const dataObject = { y: averageTemp, label: humanTime }
			return dataObject
		})
	}
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
		data: [{
			type: "spline",
			name: "big",
			showInLegend: true,
			dataPoints: currentData
		},
		{
			type: "spline",
			name: "2017",
			showInLegend: true,
			dataPoints: [
				{ y: 172, label: "Jan" },
				{ y: 173, label: "Feb" },
				{ y: 175, label: "Mar" },
				{ y: 172, label: "Apr" },
				{ y: 162, label: "May" },
				{ y: 165, label: "Jun" },
				{ y: 172, label: "Jul" },
				{ y: 168, label: "Aug" },
				{ y: 175, label: "Sept" },
				{ y: 170, label: "Oct" },
				{ y: 165, label: "Nov" },
				{ y: 169, label: "Dec" }
			]
		}]
	}
	return (
		<div>
			<CanvasJSChart options={options}
			// {/* /* onRef={ref => this.chart = ref} */ */}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
	);

}
