import React, {Component} from "react";
import {Navbar, NavbarItem} from "bloomer";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuToggle: false,
        };
    }



    render() {
        return <Navbar></Navbar>;
    }
}

export default Navigation;
