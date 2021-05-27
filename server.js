'use strict';


require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json');

const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})



//http://localhost:3005/movie?city=Amman
// https://api.themoviedb.org/3/search/movie?api_key=3db36bcfc99f611aef75cef6c6346ca9&query=seattle;
const movieHandler = require('./Modules/Movies.js');
server.get('/movie', movieHandler);


//http://localhost:3005/weather?city=Amman
//https://api.weatherbit.io/v2.0/forecast/daily?city=london&key=a08e3d69de0647cf8551c3a0297ed178
const weatherHandler = require('./Modules/weather.js');
server.get('/weather', weatherHandler);


server.get('*', (req, res) => {
    res.send('not found');
});









