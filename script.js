$(document).ready(function(){
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
        if (searchText === 'Game of Thrones' && 'Games of Thrones' ) {
            console.log('o porr')
            let audio = document.querySelector('.movies-container')
            console.log(audio);
            audio.insertAdjacentHTML('afterend', 
                `<audio autoplay loop>
                    <source src="Game of Thrones.mp3" type="audio/ogg">
                    <source src="Game of Thrones.mp3" type="audio/mpeg">
                 </audio>
                 `
                 )
            document.body.style.background = 'url("wallpaperflare.com_wallpaper.jpg")'; 
          }
        else{
            return false;
        }
    })
})


 function getMovies(searchText){
        localStorage.setItem('saved', searchText)        
        let get = localStorage.getItem('saved')
        console.log(get);
        fetch(`https://www.omdbapi.com/?s=${get}&apikey=5984d0c2`).
        then(response => response.json()).
        then(data => {
            let movieInfo = data.Search;
            let output = '';
            $.each(movieInfo, (index, movie) => {
                output += `
                 <div class=" col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 contain">
                    <div class="well text-center">
                        <img src=${movie.Poster}>
                        <h5 id="movie-Title">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary more-info" heref="movie.html" target="_blank">More info</a>
                   </div>
                 </div>
                `; 
            })
            
            $('#movies').html(output);
        })
    

    .catch((err) => {
        console.log(err);
    })
}


function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie () {
    let movieId = sessionStorage.getItem('movieId');
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=5984d0c2`).
        then(response => response.json()).
        then(data => {
            let movie = data;
          let output = 
          `
          <div class="row">
            <div class="col-md-4">
                <img style="width: 100%;" src="${movie.Poster} class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group more-info">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Duration:</strong> ${movie.Runtime}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                </ul>
            </div>

            <div class="row">
             <div class="well">
               <h3>Plot</h3>
               ${movie.Plot}
               <hr>
            <div class="last-links">
               <a style="width: 10rem; margin: 0 0 20px 40px" href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
               <a style="width: 15rem; margin: 0 0 20px 0" href="index.html" class="btn btn-primary">Go Back To Search</a>
               <a style="width: 20rem; margin-left: -40px" href="https://paystack.com/pay/movieapp-info-ticket" class="btn btn-primary bg-ticket">Purchase Ticket</a>
            </div>
             </div>
           </div>
          </div>
          `;

          $('#movie').html(output)
        })
        
}

