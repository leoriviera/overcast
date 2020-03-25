import React, { Component } from "react";

import { Container, Hero, HeroBody } from "bloomer";
import moment from "moment";
import Cookies from "js-cookie";

import config from "./config";

import Clock from "./components/forecast/Clock";
import Weather from "./components/forecast/Weather";

// Randomly generate a number between 0 and 255
let randGen = (max = 255) => {
    return Math.floor(Math.random() * max);
};

class App extends Component {
    constructor(props) {
        super(props);

        // Generate two arrays, containing three random numbers
        let initColour = [randGen(), randGen(), randGen()];
        let finColour = [randGen(), randGen(), randGen()];

        // Determine the colour of the text from the intial and final colours
        let textColour = () => {
            let l_i =
                (initColour[0] * 0.299 +
                    initColour[1] * 0.587 +
                    initColour[2] * 0.144) /
                255;
            let l_f =
                (finColour[0] * 0.299 +
                    finColour[1] * 0.587 +
                    finColour[2] * 0.144) /
                255;
            if (l_i > 0.35 || l_f > 0.4) {
                return "#fff";
            } else {
                return "#ddd";
            }
        };

        // Generate string for the background colour
        let backgroundColour = () => {
            return `linear-gradient(${randGen(180)}deg, rgb(${initColour.join(
                ","
            )}), rgb(${finColour.join(",")}))`;
        };

        // Fetch access key from config file
        this.accessKey = config.API_KEY;

        // Set up state
        this.state = {
            settings: { text: textColour() },
            background: backgroundColour(),
            forecast: null,
            coords: null,
            error: null
        };
    }

    // When the component mounts...
    componentDidMount = async () => {
        // Fetch IP, forecast, coordinates from cookies
        let ip = Cookies.get("ip");
        let forecast = Cookies.getJSON("forecast");
        let coords = Cookies.getJSON("coords");

        // Try to...
        try {
            // Look up IP
            let ipLookupResponse = await fetch("https://ipapi.co/json");

            // Destructure response
            let {
                ip: queryIp,
                latitude: lat,
                longitude: lon,
                city,
                region,
                country_name: country
            } = await ipLookupResponse.json();

            console.log(queryIp);

            // If the IPs are different, or there is no forecast...
            if (ip !== queryIp || forecast === undefined) {
                // Create coords object
                coords = {
                    city,
                    region,
                    country
                };

                // Fetch the weather forecast
                let forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?appid=${this.accessKey}&lat=${lat}&lon=${lon}&units=metric`
                );

                // Destructure response
                let { list: forecastList } = await forecastResponse.json();

                // Get today's forecasts in array
                let todayForecast = forecastList.filter((entry) =>
                    moment().isSame(moment.unix(entry.dt), "day")
                );

                // Set today's forecasts to first entry in array
                forecast = [todayForecast];

                console.log(todayForecast);

                // Get forecasts for the next four days, if there are forecasts today
                // Otherwise, get next five day forecasts
                let daysRemaining = todayForecast.length > 0 ? 4 : 5;

                console.log(daysRemaining);

                // For the next week, fetch each entry at 12 noon
                for (
                    let i = todayForecast.length + 4;
                    i < daysRemaining * 8;
                    i += 8
                ) {
                    forecast.push(forecastList[i]);
                }

                // Set Date object tomorrow at midnight
                let today = new Date();
                let tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);

                // Set IP, coords, forecast to cookies
                Cookies.set("ip", queryIp);
                Cookies.set("coords", coords, {
                    expires: tomorrow
                });
                Cookies.set("forecast", forecast, {
                    expires: tomorrow
                });
            }

            // console.log(forecast);
        } catch (error) {
            // Print the error to the console
            console.log(error);

            // Set the error to state
            this.setState({
                error
            });
        } finally {
            // Unshift today's forecasts
            let today = forecast.shift();

            // Set the current forecast to an empty entry
            let currentForecast =
                today.length > 0 ? today[today.length - 1] : {};

            // If there is more than one entry for today
            if (today.length > 0) {
                // For each entry...
                for (let prediction of today) {
                    // Calculate moment object
                    let predictionMoment = moment.unix(prediction.dt);
                    // If the time is not the same or is not before now...
                    if (!predictionMoment.isSameOrBefore(moment(), "hour")) {
                        // Set current forecast to the weather prediction
                        currentForecast = prediction;
                        console.log(
                            predictionMoment.format("DD/MM/YYYY HH:mm:ss")
                        );
                        // Break the loop
                        break;
                    }
                }
                console.log(currentForecast);
            }

            // Add the forecast to the front of the array
            forecast.unshift(currentForecast);

            if (forecast.length > 5) {
                forecast.pop();
            }

            // Set coordinates and forecast to state
            this.setState({
                coords: coords,
                forecast: forecast
            });
        }
    };

    // Update a setting
    updateSettings = (settings) => {
        this.setState({
            settings
        });
    };

    render() {
        // Destructure state
        let { settings, background, coords, forecast, error } = this.state;
        let { text } = settings;

        return (
            <Hero
                isFullHeight
                style={{ background: background, textColor: text }}>
                <HeroBody>
                    <Container hasTextAlign='centered'>
                        <Clock colour={text} />
                        <Weather
                            colour={text}
                            forecast={forecast}
                            coords={coords}
                            error={error}
                        />
                    </Container>
                </HeroBody>
            </Hero>
        );
    }
}

export default App;
