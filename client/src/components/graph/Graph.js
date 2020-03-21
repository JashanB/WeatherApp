import React, { useEffect, useState } from 'react'
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const toCelsius = function (num) {
	const temp = ((num - 32) * 5 / 9).toFixed(1)
	return temp
}

export default (props) => {
	let setNumber = props.pastYears
	if (props.historicalData.hisWeather["1"]) {
		const minus1 = props.historicalData.hisWeather["1"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 1, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["2"]) {
		const minus2 = props.historicalData.hisWeather["2"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 2, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["3"]) {
		const minus3 = props.historicalData.hisWeather["3"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 3, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["4"]) {
		const minus4 = props.historicalData.hisWeather["4"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 4, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["5"]) {
		const minus5 = props.historicalData.hisWeather["5"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 5, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["6"]) {
		const minus6 = props.historicalData.hisWeather["6"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 6, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["7"]) {
		const minus7 = props.historicalData.hisWeather["7"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 7, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["8"]) {
		const minus8 = props.historicalData.hisWeather["8"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 8, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["9"]) {
		const minus9 = props.historicalData.hisWeather["9"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 9, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["10"]) {
		const minus10 = props.historicalData.hisWeather["10"].map(function (day, index) {
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: 10, y: averageTemp }
			return dataObject
		})
	}
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title: {
				text: "Bounce Rate by Week of Year"
			},
			axisY: {
				title: "Bounce Rate",
				includeZero: false,
				suffix: "%"
			},
			axisX: {
				title: "Week of Year",
				prefix: "W",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%", //sets tool tip thing when hovering 
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
					{ x: 17, y: 59.5 },
					{ x: 18, y: 63 },
					{ x: 19, y: 58 },
					{ x: 20, y: 54 },
					{ x: 21, y: 59 },
					{ x: 22, y: 64 },
					{ x: 23, y: 59 }
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
