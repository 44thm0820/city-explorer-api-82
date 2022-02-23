'use strict';

console.log('Hellow world, form our FIRST server!');

// in our servers we MUST use require instead of import
// to create server, bring in Express, as per docs
const express = require('express');

// once we have express, we must use express
const app = express();
