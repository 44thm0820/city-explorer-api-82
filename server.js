'use strict';

console.log('Hellow world, form our FIRST server!');

// in our servers we MUST use require instead of import
// to create server, bring in Express, as per docs
const express = require('express');

// once we have express, we must use express
const app = express();

// bring in dotenv if we are going to use a .env

require('dotenv').config();
const PORT = process.env.PORT || 3002;

// we must include CORS if we want to share resources over the web
const cors = require('cors');
app.use(cors());

// creating basic default route
app.get('/', (request, response) => {
  response.send('Hello, from our server!');
});

const weatherData = require('./data/weather.json');

app.get('/weather', (request, response) => {

  try {
    let searchQuery = request.query.searchQuery; //naming per trello

    let lat = request.query.lat;
    let lon = request.query.lon;

    let foundData = weatherData.find(cityData => cityData.lat === lat && cityData.lon === lon) || weatherData.find(cityData => cityData.city_name === searchQuery);
    let forecastArray = foundData.data.map(datDay => new Forecast(dataDay));
    response.send(forecastArray);
  } catch(error) {
    throw new Error('weather not found for your submitted city');
    // throw new Error(error.message);
    // response.status(404).send('weather not found for your submitted city');
  }
});

app.get('*', (request, response) => {
  response.send('Not sure what you\'re looking for, but that route doesn\'t exist');
});


class Forecast {
  constructor(dataDay) {
    this.description = `Low of ${dataDay.low_temp}, high of ${dataDay.high_temp} with ${dataDay.weather.description.toLowerCase()}`; //sample response format per Trello
    this.date = dataDay.datetime;
  }
}

// below added as referenced from https://github.com/codefellows/seattle-code-301d82/blob/main/class-07/inclass-demo/backend/server.js
//also 2022-02-23 lecture at 952am point 
// Error Handling middleware, must be the LAST middleware, with catch-all being very last.
// I know this is middleware because of app.use
// the call back must be an error handler.
// this is a catch-all error handler
app.use( (error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
