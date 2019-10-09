import React, {Component} from "react";
import {Title, Subtitle, Columns, Column} from "bloomer";
import moment from "moment";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    tick = () => {
        this.setState(() => {
            return {
                date: new Date(),
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
        let {date} = this.state;
        let {colour: color} = this.props;
        return (
            <>
                <Columns isCentered>
                    <Column isSize={"1/4"} />
                    {["hh", "mm", "ss"].map((time, times) => {
                        return (
                            <Column key={`time-${times}`}>
                                <Title isSize={1} style={{color}}>
                                    {moment(date).format(time)}
                                </Title>
                            </Column>
                        );
                    })}
                    <Column isSize={"1/4"} />
                </Columns>
                <Subtitle isSize={3} style={{color}}>
                    {moment(date).format("dddd, MMMM Do")}
                </Subtitle>
            </>
        );
    }
}

export default Clock;
