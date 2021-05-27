const axios = require('axios');
module.exports = movieHandler;


let inMemoryMovie = {};

function movieHandler(req, res) {
    let movieQuery = req.query.city;
    let key = process.env.MOVIE_API_KEY;

    //http://localhost:3005/movie?city=Amman
    // https://api.themoviedb.org/3/search/movie?api_key=3db36bcfc99f611aef75cef6c6346ca9&query=seattle;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieQuery}`;

    if (inMemoryMovie[movieQuery] !== undefined) {
        console.log('get the data from the Memory Movie')
        response.send(inMemoryMovie[movieQuery])

    } else {
        console.log('get the data from the API');
        axios
            .get(movieUrl)
            .then(result => {
                const movieArray = result.data.results.map(movieItem => {
                    return new Movie(movieItem);

                })
                res.send(movieArray);
                console.log('get the data from the Memory Movie')
            })
            .catch(err => {
                res.status(500).send(`Movie data related to this city is not found ${err}`);
            })
    }

        // axios
        //     .get(movieUrl)
        //     .then(result => {
        //         const movieArray = result.data.results.map(movieItem => {
        //             return new Movie(movieItem);

        //         })
        //         res.send(movieArray);
        //     })
        //     .catch(err => {
        //         res.status(500).send(`Movie data related to this city is not found ${err}`);
        //     })
  






}

class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
    }
}

