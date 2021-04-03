
$(document).ready(function(){
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
})

function getMovies(searchText){
        fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=5984d0c2`).
        then(response => response.json()).
        then(data => {
            //console.log(data);
            let movieInfo = data.Search;
            //console.log(movieInfo);
            let output = '';
            $.each(movieInfo, (index, movie) => {
                output += `
                 <div class=" col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 contain">
                    <div class="well text-center">
                        <img src=${movie.Poster}>
                        <h5 id="movie-Title">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary more-info" heref="../html/movie.html" target="_blank">More info</a>
                   </div>
                 </div>
                `;
                
            })
           
            $('#movies').html(output);
            console.log($('#movies'));
            let moving = document.getElementById('movie-Title')
            console.log(moving);
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
    console.log(movieId);
    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=5984d0c2`).
        then(response => response.json()).
        then(data => {
          
          let movie = data;
          console.log(movie);
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
               <a style="width: 15rem;" href="../html/index.html" class="btn btn-primary">Go Back To Search</a>
            </div>
             </div>
           </div>
          </div>
          `;

          $('#movie').html(output)
      seen()    
        })
        
}

$(".buy-ticket").on('click', (e) =>{
    alert('seen');
})

$('.buy-ticket').on('click', (e)=> {
    console.log('okay');
    getMovie();
})
function seen() {
    $('.buy-ticket').on('click', (e)=> {
        console.log('okay');
        getMovie();
        fetch(`http://www.api.paystack.co.transaction`).
        then(response => response.json()).
        then(data => {
            console.log(data);
        })
        
    })
}
