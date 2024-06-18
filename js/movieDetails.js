document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  fetch(`http://localhost:8080/stephen-king/api/tmdb/movie/${movieId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(movie => {
      displayMovieDetails(movie);
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
    });

  function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movieDetails');

    let posterUrl = '';
    if (movie.posterPath) {
      posterUrl = `https://image.tmdb.org/t/p/w185/${movie.posterPath}`;
    }

    let htmlContent = '<div>';

    if (posterUrl) {
      htmlContent += `
      <img src="${posterUrl}" alt="${movie.originalTitle} Poster" style="max-width: 100%; border-radius: 10px;">
      <h5>${movie.originalTitle}</h5>
      <p>${movie.overview}</p>
      <ul>
        <li><strong>Release Date:</strong> ${movie.releaseDate}</li>
        <li><strong>Runtime:</strong> ${movie.runtime} minutes</li>
        <li><strong>Vote Average:</strong> ${movie.voteAverage}</li>
        <li>
          <a id="tmdbLink" href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" rel="noopener noreferrer">TMDB</a>
          <a id="imdbLink" href="https://www.imdb.com/title/${movie.imdbId}" target="_blank" rel="noopener noreferrer">IMDB</a>
        </li>
      </ul>
    `;
    } else {
      htmlContent += `
      <h5>${movie.originalTitle}</h5>
      <p>${movie.overview}</p>
      <ul>
        <li><strong>Release Date:</strong> ${movie.releaseDate}</li>
        <li><strong>Runtime:</strong> ${movie.runtime} minutes</li>
        <li><strong>Vote Average:</strong> ${movie.voteAverage}</li>
        <li>
          <a id="tmdbLink" href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" rel="noopener noreferrer">TMDB</a>
          <a id="imdbLink" href="https://www.imdb.com/title/${movie.imdbId}" target="_blank" rel="noopener noreferrer">IMDB</a>
        </li>
      </ul>
    `;
    }

    htmlContent += '</div>';
    movieDetails.innerHTML = htmlContent;
  }

});
