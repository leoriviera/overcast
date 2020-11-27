# Overcast

Overcast is a new tab page extension for Chrome, which displays the time, location and weather on a beautiful, randomly generated gradient background.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode, on local port 3000. The page hot-reloads on edits, with lint errors displayed on the console.

<!-- ### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. -->

### `npm run build`

Builds the app for production to the `build` folder, correctly bundling React in production mode and optimizes the build for the best performance. The `.env` file in the root folder sets INLINE_RUNTIME_CHUNK to false to prevent issues with Chrome's Content Security Policy on inline scripts.

## config.js

A config.js file in the `src` folder contains private keys for libraries and configuration settings for Overcast. Right now, this includes:

- `API_KEY`: The OpenWeatherAPI API key.
- `SENTRY_DSN`: The DSN for the app's Sentry project
