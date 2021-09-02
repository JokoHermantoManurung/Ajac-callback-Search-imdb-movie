$('.search-button').on('click', function(){
    $.ajax({
       url : 'http://www.omdbapi.com/?apikey=70648f01&s=' + $('.input-keyword').val(),
       success : results =>{
           let film = results.Search;
           let cards = '';
           film.forEach(movie =>{
               cards += showCard(movie);
           });
           $('.movie-container').html(cards);
    
            //Ketika Tombol di klik
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url : 'http://www.omdbapi.com/?apikey=70648f01&i=' + $(this).data('imdbid'),
                    success : result =>{
                        const movieDetail = showMovieDetail(result)
    
                    $('.modal-body').html(movieDetail);
                    },
                    error : e =>{
                        console.log(e.responseText)
                    }
                })
            });
       },
       error : e =>{
           console.log(e.responseText)
       }
    })
})

function showCard(movie){
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
    }

function showMovieDetail(result){
    return  `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${result.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">${result.Title} ${result.Year}</li>
                            <li class="list-group-item"><strong>Director : </strong>${result.Director}</li>
                            <li class="list-group-item"><strong>Aktor :</strong>${result.Actors}</li>
                            <li class="list-group-item"><strong>Writer :</strong>${result.Writer}</li>
                            <li class="list-group-item"><strong>Plot :</strong>${result.Plot}</li>
                            </ul>
                    </div>
                </div>
            </div>`;
}