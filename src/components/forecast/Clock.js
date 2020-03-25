import React, { Component } from "react";
import { Title, Columns, Column } from "bloomer";

import moment from "moment";
import Animate from "animate.css-react";

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
        let { colour: color } = this.props;

        return (
            <>
                <Animate appear='fadeInDown' durationAppear={1000}>
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
                </Animate>
                <Animate appear='fadeIn' durationAppear={1000}>
                    <Columns isCentered>
                        <Column>
                            <Title isSize={2} style={{ color }}>
                                {moment(date).format("dddd, MMMM Do")}
                            </Title>
                        </Column>
                    </Columns>
                </Animate>
            </>
        );
    }
}

export default Clock;
