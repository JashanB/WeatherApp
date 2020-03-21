import React, { useEffect, useState } from 'react'
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const toCelsius = function (num) {
	const temp = ((num - 32) * 5 / 9).toFixed(1)
	return temp
}

const convertTime = function(time) {
	const date = new Date(time * 1000)
	const formattedTime = date.toDateString();
	const slicedTime = formattedTime.slice(4)
	return slicedTime
}

export default (props) => {
	let setNumber = props.pastYears
	const current = props.weatherData.daily.data.map(function (day, index) {
		const xValue = index + 1
		const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
		const dataObject = { x: xValueValue, y: averageTemp }
		return dataObject
	})
	if (props.historicalData.hisWeather["1"]) {
		const minus1 = props.historicalData.hisWeather["1"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["2"]) {
		const minus2 = props.historicalData.hisWeather["2"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["3"]) {
		const minus3 = props.historicalData.hisWeather["3"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["4"]) {
		const minus4 = props.historicalData.hisWeather["4"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["5"]) {
		const minus5 = props.historicalData.hisWeather["5"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["6"]) {
		const minus6 = props.historicalData.hisWeather["6"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["7"]) {
		const minus7 = props.historicalData.hisWeather["7"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["8"]) {
		const minus8 = props.historicalData.hisWeather["8"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["9"]) {
		const minus9 = props.historicalData.hisWeather["9"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	if (props.historicalData.hisWeather["10"]) {
		const minus10 = props.historicalData.hisWeather["10"].map(function (day, index) {
			const xValue = index + 1
			const averageTemp = toCelsius((day.temperatureHigh + day.temperatureLow) / 2)
			const dataObject = { x: xValue, y: averageTemp }
			return dataObject
		})
	}
	const options = {
		animationEnabled: true,
		title: {
			text: "Number of New Customers"
		},
		axisY: {
			title: "Number of Customers",
			includeZero: false
		},
		toolTip: {
			shared: false
		},
		data: [{
			type: "spline",
			name: "2016",
			showInLegend: true,
			dataPoints: [
				{ y: 155, label: "Jan" },
				{ y: 150, label: "Feb" },
				{ y: 152, label: "Mar" },
				{ y: 148, label: "Apr" },
				{ y: 142, label: "May" },
				{ y: 150, label: "Jun" },
				{ y: 146, label: "Jul" },
				{ y: 149, label: "Aug" },
				{ y: 153, label: "Sept" },
				{ y: 158, label: "Oct" },
				{ y: 154, label: "Nov" },
				{ y: 150, label: "Dec" }
			]
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
