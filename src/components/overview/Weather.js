import React, { Component } from 'react';
import { Columns, Column, Subtitle } from 'bloomer';
import moment from 'moment';
import axios from 'axios';
import { weatherApiEndpoint as endpoint, weatherApiKey as appId } from '../../apiKey';
import Cookies from 'js-cookie';

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			forecast: undefined
		};

		this.cookieNames = {
			lastForecastTime: 'lastFetched',
			lastForecast: 'lastForecast',
			lastCity: 'lastCity'
		};
	}

	componentDidMount() {
		// If the browser does not support geolocation, set forecast to null...
		if (!navigator.geolocation) {
			this.setState({
				forecast: null
			});
		} else {
			// Get cookie names for last forecast time, forecast and city
			let { lastForecastTime, lastForecast, lastCity } = this.cookieNames;

			// Get the last forecast time from cookies
			let lastFetched = Cookies.get(lastForecastTime);
			// Add 30 minutes, to calculate time to refresh
			let refreshTime = parseInt(lastFetched) + 30 * 60;

			// Determine whether forecast is expired, by comparing times
			let forecastExpired = new Date(refreshTime) < new Date();

			// If there is no forecast, or the forecast has expired...
			if (!lastFetched || forecastExpired) {
				// Get the current position...
				navigator.geolocation.getCurrentPosition(async (pos) => {
					// Extract latitude and longitude
					let { latitude: lat, longitude: lon } = pos.coords;

					// Attempt to...
					try {
						// Fetch forecast data from data provider
						let weatherResponse = await axios.get(endpoint, {
							params: {
								appId,
								cnt: '5',
								lat,
								lon
							}
						});

						// Set a cookie to record when forecast was last fetched
						Cookies.set(lastForecastTime, new Date().getTime(), {
							expires: 30
						});

						// Extract weather forecast and city details from response
						// let { city, list } = weatherResponse.data;

						// Get cookie names for forecast and city

						// Write fetched data to cookie
						// Cookies.set(lastForecast, list.toString())
						// Cookies.set(lastCity, JSON.stringify(city))

						// Write the forecast, city and the online status to state
						this.setState(() => {
							return {
								// city,
								// list,
								online: true
							};
						});
					} catch (error) {
						// TODO: Fetch forecast from cookie
						// Fetch forecast, city cookies
						// If no forecast cookie, write null to state
						// If forecast cookie, write forecast to state

						// Write offline status to state
						this.setState({
							online: false
						});
					}
				});
			} else {
				// TODO: Fetch forecast, city data from cookie; write to state

			}
		}
	}

	render() {
		// Extract state and props...
		let { forecast, online } = this.state;
		let { colour: color } = this.props;

		// Create empty columns element
		let columns = null;

		// If the forecast hasn't been fetched yet...
		if (forecast === undefined) {
			// TODO: Add loading animation

			// Display loading message to the user
			columns = (
				<Column>
					<Subtitle isSize={4} style={{ color }}>
						Loading weather data...
					</Subtitle>
				</Column>
			);
		} else if (forecast === null) {
			// If there is no forecast...
			// TODO: Display no forecast message to user
		} else {
			// Extract weather data from forecast
			// columns = (forecast.list.map((dayForecast, days) => {
			//     return (
			//         <Column key={`forecast-${days}`}>
			//             <Subtitle isSize={4} style={{color}}>
			//                 {moment()
			//                     .add(days, "day")
			//                     .format("dddd")}
			//             </Subtitle>
			//         </Column>
			//     );
			// }))
		}

		// If the client is offline...
		if (!online) {
			// Display offline message to user
			columns = (
				<Column>
					<Subtitle isSize={4} style={{ color }}>
						You're offline, so we can't load the weather!
					</Subtitle>
				</Column>
			);
		}

		// Return weather to client
		return (
			<Columns isCentered>
				<Column isHidden={[ 'mobile', 'tablet' ]} />
				{columns}
				<Column isHidden={[ 'mobile', 'tablet' ]} />
			</Columns>
		);
	}
}

export default Weather;
