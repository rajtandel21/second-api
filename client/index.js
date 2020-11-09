const form = document.getElementById('myForm');
const ul = document.getElementById('movieList');

async function fetchData(){
    const firstPromise = await fetch('http://localhost:3000/movies');
    const secondPromise = await firstPromise.json();
    const data = secondPromise;
    return data;
}

async function getData(){
    const data = await fetchData();
    data.forEach(movie =>{
        let newMovie = document.createElement('li');
        newMovie.textContent = `${movie.name} and it was released in ${movie.year}`;
        ul.append(newMovie);
    })
}

async function addNewMovie(){
    const data = await fetchData();
    const newMovieData = data[data.length - 1];
    console.log(newMovieData);
    const newMovie = document.createElement('li');
    newMovie.textContent = `${newMovieData.name} and it was released in ${newMovieData.year}`;
    ul.append(newMovie);

}

form.addEventListener('submit', e=>{
    e.preventDefault();
    const movieName = e.target.name.value;
    const movieYear = e.target.year.value;

    console.log(`the movies data is name:${movieName}, year:${movieYear}`);
    const option = {
        method: 'POST',
        body: JSON.stringify({name : movieName, year: movieYear})
    }

    fetch('http://localhost:3000/movies', option)
        .then(console.log('new movie added'))
        .catch(err=> console.log('sorry movie not added.'));
    
    addNewMovie();
})


getData();