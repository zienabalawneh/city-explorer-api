const axios = require('axios'); 
module.exports = weatherHandler; 


 let inMemoryWeather = {};



function weatherHandler(req, res) {
    let weatherQuery = req.query.city;
    let key = process.env.WEATHER_API_KEY;

     //http://localhost:3005/weather?city=Amman
    // https://api.weatherbit.io/v2.0/forecast/daily?city=london&key=a08e3d69de0647cf8551c3a0297ed178
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${key}`;
    


    if (inMemoryWeather[weatherQuery] !== undefined) {
        console.log('get the data from the Memory Movie')
        response.send(inMemoryWeather[weatherQuery])

    } else {
        console.log('get the data from the API');
        axios
            .get(weatherUrl)
            .then(result => {
                const weatherArray = result.data.data.map(weatherItem => {
                     return new Forecast(weatherItem);
                   
                })
                res.send(weatherArray);
              console.log('get the data from the Memory Weather');
            })
            .catch(err => {
                res.status(500).send(`Movie data related to this city is not found ${err}`);
            })
    }

    // axios
    //     .get(weatherUrl)
    //     .then(result => {
    //         const weatherArray = result.data.data.map(weatherItem => {
    //             return new Forecast(weatherItem);
    //         })
    //         res.send(weatherArray);
    //     })
    //     .catch(err => {
    //         res.status(500).send(`Weather data for this city is not found ${err}`);
    //     })
}


class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `Low of ${item.min_temp}, high of ${item.max_temp} with ${item.weather.description}`;
    }
}