import React, { createRef, useEffect } from "react";
import { Columns, Column, Subtitle } from "bloomer";

import moment from "moment";
import { BeatLoader } from "react-spinners";
import Animate from "animate.css-react";
const Skycons = require("skycons")(window);

// Create Skycon
const Skycon = ({ iconName, description, color }) => {
    // Create reference for Skycon
    let ref = createRef();

    // When the component mounts...
    useEffect(() => {
        // Create a new Skycon instance, with the colour
        let skycons = new Skycons({ color });
        // Add the Skycon to the canvas
        skycons.add(ref.current, iconName);
        // Start the animation
        skycons.play();
    }, []);

    // Add the weather description in tooltip
    // and prevent click icon from showing on hover
    return (
        <div
            data-tooltip={description.replace(/^\w/, (c) => c.toUpperCase())}
            style={{ cursor: "default" }}
            className='has-tooltip-bottom'>
            <canvas height='128' width='128' ref={ref} />
        </div>
    );
};

const Weather = ({ colour: color, forecast, coords, error }) => {
    let iconDict = {
        200: "thunder-rain",
        201: "thunder-rain",
        202: "thunder-rain",
        210: "thunder",
        211: "thunder",
        212: "thunder",
        221: "thunder",
        230: "thunder-rain",
        231: "thunder-rain",
        232: "thunder-rain",
        300: "rain",
        301: "rain",
        302: "rain",
        310: "rain",
        311: "rain",
        312: "rain",
        313: "rain",
        314: "rain",
        321: "rain",
        500: "rain",
        501: "rain",
        502: "rain",
        503: "rain",
        504: "rain",
        511: "rain",
        520: "rain",
        521: "rain",
        522: "rain",
        531: "rain",
        600: "snow",
        601: "snow",
        602: "snow",
        611: "sleet",
        612: "sleet",
        613: "sleet",
        615: "rain-snow",
        616: "rain-snow",
        620: "rain-snow",
        621: "rain-snow",
        622: "rain-snow",
        701: "fog",
        711: "fog",
        721: "fog",
        731: "fog",
        741: "fog",
        751: "fog",
        761: "fog",
        762: "fog",
        771: "fog",
        781: "fog",
        800: "clear-day",
        801: "partly-cloudy-day",
        802: "partly-cloudy-day",
        803: "cloudy",
        804: "cloudy",
    };

    let message = null;
    let location = null;
    let loading = null;

    // If there is no error...
    if (error === null) {
        // Set loading message
        loading = (
            <Columns>
                <Column>
                    <BeatLoader color={color} />
                </Column>
            </Columns>
        );
    }

    // If there is an error...
    if (error) {
        // Display error message in place of forecast
        message =
            "The weather forecast couldn't be fetched. Please try again later.";
    }

    // Create forecast content, with message
    let forecastContent = (
        <Columns isVCentered style={{ height: "100%" }}>
            <Column>
                <Subtitle isSize={4} style={{ color }}>
                    {message}
                </Subtitle>
            </Column>
        </Columns>
    );

    // If there is a forecast...
    if (forecast) {
        // Replace forecast content with forecast
        forecastContent = (
            <Columns isCentered isVCentered isHidden='mobile'>
                {forecast.map((dayForecast, days) => {
                    if (Object.keys(dayForecast).length === 0) {
                        return null;
                    }

                    // Destructure forecast
                    let {
                        dt,
                        weather,
                        main: { temp_min, temp_max },
                    } = dayForecast;

                    // Round the temperatures to nearest integer
                    temp_min = Math.round(temp_min);
                    temp_max = Math.round(temp_max);

                    // Extract weather status ID, and description
                    let { id, description } = weather[0];

                    // Get the name of icon
                    let iconName = iconDict[id];

                    return (
                        <Column key={`forecast-${days}`}>
                            <Subtitle
                                isSize={3}
                                style={{ color }}
                                className='is-hidden-desktop-only'>
                                <span>{moment.unix(dt).format("dddd")}</span>
                            </Subtitle>
                            <Skycon
                                iconName={iconName}
                                color={color}
                                description={description}
                            />
                            <Columns isCentered isVCentered>
                                <Column>
                                    <Subtitle isSize={4} style={{ color }}>
                                        {temp_max}°
                                    </Subtitle>
                                </Column>
                                {/* <Column>
                            <Subtitle isSize={5} style={{ color }}>
                                {temp_min}°
                            </Subtitle>
                        </Column> */}
                            </Columns>
                        </Column>
                    );
                })}
            </Columns>
        );

        loading = null;
    }

    if (coords) {
        let { city, region, country } = coords;
        location = (
            <Columns isCentered isHidden='mobile'>
                <Column>
                    <Subtitle isSize={4} style={{ color }}>
                        {city}, {region}, {country}
                    </Subtitle>
                </Column>
            </Columns>
        );
    }

    return (
        <>
            {/* <Animate appear='fadeIn' leave='fadeOutDown'>{loading}</Animate> */}
            <Animate change='fadeIn' durationAppear={1000}>
                <div style={{ height: "306.667px" }}>
                    {forecastContent}
                    {location}
                </div>
            </Animate>
        </>
    );
};

export default Weather;
