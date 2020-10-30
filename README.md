# circleci-technical-challenge-2

## App Url
https://circleci-tech-challenge-dh-2.herokuapp.com/

## Description

This is a basic web app to demonstrate understanding of CircleCI's countinuous integration, deployment, and testing platform.

## Details

This app uses an express server in Node.js to serve the static html, js, css, and image files. Hidden text will appear after clicking the button, though clicking the button may prove to be more challenging than you might expect.

## Tests

The tests to verify app functionality are written using the [Mocha](https://github.com/mochajs/mocha) testing framework along with a headless browser provided by [zombie.js](http://zombie.js.org/).

## Build and Deployment

When code is pushed to the repository, CircleCI does the following:

* Runs tests
* Deploys to Heroku if all of the tests pass
* Send a Slack notification depending on build success or failure
* Run Lighthouse performance report and send results to Slack

Each of these steps makes utilizes the relevant orb in the config
