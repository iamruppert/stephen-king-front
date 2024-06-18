document.addEventListener('DOMContentLoaded', () => {
  const moviesTable = document.getElementById('moviesTable');
  const movieDetails = document.getElementById('movieDetails');

  fetch('http://localhost:8080/stephen-king/api/tmdb/movies')
    .then(response => response.json())
    .then(data => {
      data.forEach(movie => {
        const tr = document.createElement('tr');
        tr.classList.add('movie-item');
        tr.innerHTML = `
          <td><a href="#" data-id="${movie.id}">${movie.originalTitle}</a></td>
        `;
        moviesTable.appendChild(tr);
      });
      attachEventListeners();
    });

  function attachEventListeners() {
    const movieLinks = document.querySelectorAll('.movie-item a');
    movieLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const movieId = event.target.getAttribute('data-id');
        fetchMovieDetails(movieId);
      });
    });
  }

  function fetchMovieDetails(movieId) {
    // Display loading indicator if needed
    showLoadingIndicator();

    fetch(`http://localhost:8080/stephen-king/api/tmdb/movie/${movieId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(movie => {
        hideLoadingIndicator();
        showMovieModal(movie);
      })
      .catch(error => {
        hideLoadingIndicator();
        console.error('Error fetching movie details:', error);
      });
  }

  function showMovieModal(movie) {
    // Update modal content with movie details
    movieDetails.innerHTML = `
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

    // Show modal using Bootstrap's jQuery functions
    $('#movieModal').modal('show');
  }

  function showLoadingIndicator() {
    // Implement if needed
  }

  function hideLoadingIndicator() {
    // Implement if needed
  }
});
