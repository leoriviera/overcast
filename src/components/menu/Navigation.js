import React, { Component } from 'react';
import { HeroHeader, Navbar, NavbarMenu, NavbarEnd, NavbarItem } from 'bloomer';

// import SettingsModal from './SettingsModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuToggle: false
		};
	}

	render() {
		let { toggleModal } = this.props;
		let { text: color } = this.props.settings;
		return (
			<HeroHeader>
				<Navbar>
					<NavbarMenu>
						<NavbarEnd>
							<NavbarItem>
								<FontAwesomeIcon icon="cog" color={color} size="lg" onClick={toggleModal} />
							</NavbarItem>
						</NavbarEnd>
					</NavbarMenu>
				</Navbar>
			</HeroHeader>
		);
	}
}

export default Navigation;
