import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import config from "./config";

import "./index.scss";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

Sentry.init({ dsn: config.SENTRY_DSN });

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
