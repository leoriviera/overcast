import React, { Component } from 'react';
import { Hero, HeroBody, Columns, Column } from 'bloomer';
import SettingsModal from './components/menu/SettingsModal';
import Navigation from './components/menu/Navigation';
import Overview from './components/overview/Overview';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import update from 'immutability-helper';

library.add(faCog);

class App extends Component {
	constructor(props) {
		super(props);

		let randGen = (max = 256) => {
			return Math.floor(Math.random() * max);
		};

		let initColour = [ randGen(), randGen(), randGen() ];
		let finColour = [ randGen(), randGen(), randGen() ];

		let textColour = () => {
			let l_i = (initColour[0] * 0.299 + initColour[1] * 0.587 + initColour[2] * 0.144) / 255;
			let l_f = (finColour[0] * 0.299 + finColour[1] * 0.587 + finColour[2] * 0.144) / 255;
			if (l_i > 0.5 || l_f > 0.5) {
				return '#ffffff';
			} else {
				return '#dddddd';
			}
		};

		let backgroundColour = () => {
			return `linear-gradient(${randGen(180)}deg, rgb(${initColour.join(',')}), rgb(${finColour.join(',')}))`;
		};

		this.state = {
			settings: { text: textColour() },
			settingsModal: {
				active: false,
				initialLoad: false
			},
			background: backgroundColour()
		};
	}

	updateSettings = (settings) => {
		this.setState({
			settings
		});
	};

	toggleSettingsModal = () => {
		this.setState((previousState) => {
			let { active } = previousState;
			return update(this.state, {
				settingsModal: {
					$toggle: [ 'active' ],
					initialLoad: {
						$set: true
					}
				}
			});
		});
	};
	x;
	render() {
		let { settings, background } = this.state;
		let { active, initialLoad } = this.state.settingsModal;

		console.log(this.state);

		return (
			<Hero isFullHeight style={{ background: background }}>
				<Navigation settings={settings} toggleModal={this.toggleSettingsModal} />
				<Overview settings={settings} />
			</Hero>
		);
	}
}

export default App;
