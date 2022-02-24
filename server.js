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
  let searchQuery = request.query.searchQuery;

  let lat = request.query.lat;
  let lon = request.query.lon;

  let foundData = weatherData.find(cityData => cityData.lat === lat && cityData.lon === lon) || weatherData.find(cityData => cityData.city_name === searchQuery);
  if (foundData) {
    response.send(foundData.data.map(dataDay => new Forecast(dataDay)));
  } else {
    response.status(404).send('these are not the droids you are looking for...');
  }
 
});

// app.get('/banana', (request, response) => {
//   response.send('mmmmmm bananas');
// });

// app.get('/sayHello', (request, response) => {
//   console.log(request.query);
//   let firstName = request.query.firstName;
//   let lastName = request.query.lastName;
//   response.send(`Hello ${firstName} ${lastName}`);
// });

app.get('*', (request, response) => {
  response.send('Not sure what you\'re looking for, but that route doesn\'t exist');
});

class Forecast {
  constructor(dataDay) {
    this.description = `Low of ${dataDay.low_temp}, high of ${dataDay.high_temp} with ${dataDay.weather.description.toLowerCase()}`;
    this.date = dataDay.valid_date;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
