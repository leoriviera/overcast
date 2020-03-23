import React, { Component } from "react";
import { Title, Subtitle, Columns, Column } from "bloomer";
import moment from "moment";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    tick = () => {
        this.setState(() => {
            return {
                date: new Date()
            };
        });
    };

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        let { date } = this.state;
        let { colour: color, coords } = this.props;

        let location = null;

        if (coords) {
            let { city, region, country } = coords;
            location = (
                <Subtitle isSize={4} style={{ color }}>
                    {city}, {region}, {country}
                </Subtitle>
            );
        }

        return (
            <>
                <Columns isCentered>
                    {["HH", "mm", "ss"].map((time, times) => {
                        return (
                            <Column key={`time-${times}`}>
                                <Title style={{ color, fontSize: "180px" }}>
                                    {moment(date).format(time)}
                                </Title>
                            </Column>
                        );
                    })}
                </Columns>
                <Columns>
                    <Column>
                        <Title isSize={2} style={{ color }}>
                            {moment(date).format("dddd MMMM Do")}
                        </Title>
                        {location}
                    </Column>
                </Columns>
            </>
        );
    }
}

export default Clock;
