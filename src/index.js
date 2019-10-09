import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import 'animate.css/source/_base.css';
import 'animate.css/source/fading_entrances/fadeIn.css';
import 'animate.css/source/sliding_entrances/slideInUp.css';
import 'animate.css/source/sliding_exits/slideOutDown.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
