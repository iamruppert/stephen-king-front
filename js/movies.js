document.addEventListener('DOMContentLoaded', () => {
  const moviesTable = document.getElementById('moviesTable');

  fetch('http://localhost:8080/stephen-king/api/tmdb/movies')
    .then(response => response.json())
    .then(data => {
      data.forEach(movie => {
        const tr = document.createElement('tr');
        tr.classList.add('movie-item');
        tr.innerHTML = `
          <td><a href="./moviedetails.html?id=${movie.id}">${movie.originalTitle}</a></td>
        `;
        moviesTable.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
});
