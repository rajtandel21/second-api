const e = require('express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


let server = express();
server.use(cors());
server.use(bodyParser.json());

let favMovies = [
    {id: 1, name: "avengers", year: 2019},
    {id: 2, name: "day after tomorrow", year: 2008},
    {id: 3, name: "die hard", year: 1988}
];

server.get('/', (req, res)=>{
    res.status(200).send('Hello movie junkie, check your list with /movies')
})

server.get('/movies', (req, res)=>{
    res.status(200).send(favMovies);
})

server.post('/movies', (req, res)=>{
    const reqBody = req.body;
    const newMovie = {id: favMovies.length + 1, ...reqBody};

    const compareMovieData = favMovies.map(movie=>({
        name: movie.name,
        year: movie.year
    }))

    let index = compareMovieData.findIndex(movie => {
        return Object.keys(movie).every(key=>{
            return movie[key] === reqBody[key];
        })
    });

    if(index >= 0){
        res.status(400).send('Movie alread in list, enter another');
    }else {
        favMovies.push(newMovie);
        res.status(201).send(newMovie);
    }
})

server.delete('/movies', (req,res)=>{
    favMovies.pop();
    res.status(200).send(favMovies)
})

module.exports = server;