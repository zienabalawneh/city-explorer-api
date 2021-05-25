'use strict';

require('dotenv').config();
const exp =require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');

const server  = exp();
server.use(cors()); //  make my server opened for anyone




// const PORT = 3003;
const PORT=process.env.PORT;

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})


// // http://localhost:3003/
// server.get('/', (req, res) => {
//     res.send('home route')
// })


// http://localhost:3004/getLocation?city_name=Amman&lon=35.91&lat=31.95
// http://localhost:3004/getLocation?city_name=Seattle&lon=-122.33207&lat=47.60621

server.get('/getLocation', (req, res) => {
    console.log(req.query);
    let  forecast1;
    let locNameData= req.query.city_name;
   
    let lon=req.query.lon;
    let lat=req.query.lat;
    let locationItem = weatherData.find(item => {
        if (item.city_name == locNameData&&  Math.round(item.lon)==lon&&Math.round(item.lat)==lat ){
         forecast1 = new Forecast(item);
            return item


        }
         
    });

    console.log(lat,lon);
    res.send(forecast1)
    // res.send(locationItem.description);

});


// server.get('*', (req, res) => {
//     res.status(404).send('not found');
// })


class Forecast {

constructor (arr){
    this.Data=arr.data.map(item=>{
    let low = 'low of '+item.low_temp;
    let high='high of '+item.max_temp;
    return { "description":low + high+' with  '+item.weather.description,"data":item.datetime};});

}

}


