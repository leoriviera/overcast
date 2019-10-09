import React from 'react';
import { Container, HeroBody } from 'bloomer';
import Clock from './Clock';
import Weather from './Weather';

let Overview = ({ settings }) => {
	let { text } = settings;

	return (
		<HeroBody>
			<Container hasTextAlign="centered">
				<Clock colour={text} />
				<Weather colour={text} />
			</Container>
		</HeroBody>
	);
};

export default Overview;
