
const randomButton = document.getElementById('random-film')
const apiKey = "c8bdca25f7e300dc2cded2cc614e9365"
const mainContainer = document.querySelector('.main-container')
const filmCard = document.createElement('div')
filmCard.classList.add('film-card')
const filmTitle = document.createElement('div')
filmTitle.classList.add('film-info-title')
const filmGenre = document.createElement('div')
filmGenre.classList.add('film-info-genre')
const filmDate = document.createElement('div')
filmDate.classList.add('film-info-date')
const filmDesc = document.createElement('div')
filmDesc.classList.add('film-info-desc')
const imdbLink = document.createElement('a')
imdbLink.classList.add('film-info-link')
const filmDrct = document.createElement('div')
filmDrct.classList.add('film-info-drct')


function randomLink() {
    const randomFilm = Math.floor((Math.random()*427083)+ 3)
    const randomMoviesLink = `https://api.themoviedb.org/3/movie/${randomFilm}?api_key=`
    return randomMoviesLink
}

function getRandomData(link, api) {
    filmCard.innerHTML = ''
    fetch(link + api, {mode: "cors"})
    .then(response => response.json())
    .then(function(response) {
        console.log(response)
        createRandomMoviecard(response)
        })
    .catch(function(error) {
        console.log(error)
      })
}

function createRandomMoviecard(response) {
    if ('status_code' in response) {
        getRandomData(randomLink(), apiKey)
    } else {
        mainContainer.appendChild(filmCard)
        filmTitle.innerHTML = response.title
        filmCard.appendChild(filmTitle)
        filmGenre.innerHTML = "Genre: " + response.genres[0].name
        filmCard.appendChild(filmGenre)
        filmDate.innerHTML = "Date released: " + response.release_date
        filmCard.appendChild(filmDate)
        filmDesc.innerHTML = "Description: " + response.overview
        filmCard.appendChild(filmDesc)

        const optionsDir = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2e069a54b1mshf46fb9fc5ca9fdcp1493dcjsn37e4d2f548ba',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };
        fetch (`https://online-movie-database.p.rapidapi.com/title/get-top-crew?tconst=${response.imdb_id}`, optionsDir)
            .then(response => response.json())
            .then(function(response) {
                console.log(response)
                filmDrct.innerHTML = "Director: " + response.directors[0].name
                filmCard.appendChild(filmDrct)
            })
            .catch(err => console.error(err));
        imdbLink.href = `https://www.imdb.com/title/${response.imdb_id}`
        imdbLink.innerHTML = "IMDB"
        filmCard.appendChild(imdbLink)
        
        const optionsCast = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2e069a54b1mshf46fb9fc5ca9fdcp1493dcjsn37e4d2f548ba',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };
    }
}

function getRandomTopFilmData() {
    const randomTopInt = Math.floor(Math.random()*6)
    const topLink = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${randomTopInt}`
    fetch(topLink, {mode: 'cors'})
    .then(response => response.json())
    .then(function(response){
        console.log(response)
        createTopMovieCard(response)
    })
}

function createTopMovieCard(response) {
    filmCard.innerHTML = ''
    randomFilmInt = Math.floor(Math.random()*20)
    mainContainer.appendChild(filmCard)
    filmTitle.innerHTML = response.results[randomFilmInt].title
    filmCard.appendChild(filmTitle)
    filmDate.innerHTML = "Date released: " + response.results[randomFilmInt].release_date
    filmCard.appendChild(filmDate)
    filmDesc.innerHTML = "Description: " + response.results[randomFilmInt].overview
    filmCard.appendChild(filmDesc)
}

