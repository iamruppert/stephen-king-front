document.addEventListener("DOMContentLoaded", function () {
  const resultsContainer = document.getElementById("results");
  const loadingIndicator = document.getElementById("loadingIndicator");

  // Początkowe pobranie danych
  fetchBooks("pages", "asc");

  const navbarToggler = document.querySelector(".navbar-toggler");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const menuContent = document.querySelector("#menuOverlay");
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const sortButton = document.getElementById("sort-button");
  const sortFilter = document.getElementById("filter");
  const sortOrderFilter = document.getElementById("sort-order");
  const resetButton = document.getElementById("reset-button");

  navbarToggler.addEventListener("click", function () {
    menuOverlay.classList.add("show");
    menuOverlay.classList.remove("hide");
  });

  closeMenu.addEventListener("click", function () {
    menuOverlay.classList.add("hide");
    setTimeout(() => {
      menuOverlay.classList.remove("show");
    }, 500);
  });

  menuContent.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  menuOverlay.addEventListener("click", function (event) {
    if (!menuContent.contains(event.target)) {
      menuOverlay.classList.add("hide");
      setTimeout(() => {
        menuOverlay.classList.remove("show");
      }, 500);
    }
  });

  searchButton.addEventListener("click", function () {
    const searchValue = searchInput.value.trim();
    if (searchValue !== "") {
      fetchBooksByName(searchValue);
    }
  });

  sortButton.addEventListener("click", function () {
    const searchValue = searchInput.value.trim();
    const sortBy = sortFilter.value;
    const sortOrder = sortOrderFilter.value;

    if (searchValue !== "") {
      fetchBooksByName(searchValue, sortBy, sortOrder);
    } else {
      fetchBooks(sortBy, sortOrder);
    }
  });

  resetButton.addEventListener("click", function () {
    fetchBooks("pages", "asc");
  });

  function fetchBooks(sortBy, sortOrder) {
    // Wyświetlanie wskaźnika ładowania
    showLoadingIndicator();

    fetch(`http://localhost:8080/stephen-king/api/books?sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        hideLoadingIndicator();
        displayBooks(data);
      })
      .catch((error) => {
        hideLoadingIndicator();
        console.error("Error fetching data:", error);
        resultsContainer.textContent = "Error fetching data. Please try again later.";
      });
  }

  function fetchBooksByName(name, sortBy, sortOrder) {
    // Wyświetlanie wskaźnika ładowania
    showLoadingIndicator();

    fetch(`http://localhost:8080/stephen-king/api/search?name=${name}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        hideLoadingIndicator();
        displayBooks(data);
      })
      .catch((error) => {
        hideLoadingIndicator();
        console.error("Error fetching data:", error);
        resultsContainer.textContent = "Error fetching data. Please try again later.";
      });
  }

  function displayBooks(data) {
    resultsContainer.innerHTML = "";
    data.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.className = "col-lg-3 col-md-6 mb-3";

      const coverImage = document.createElement("img");
      coverImage.className = "w-100 shadow-1-strong rounded mb-4 book-cover";
      coverImage.src = `data:image/jpeg;base64,${book.image}`;
      coverImage.alt = book.title;
      coverImage.dataset.id = book.bookId;

      bookDiv.appendChild(coverImage);
      resultsContainer.appendChild(bookDiv);
    });

    attachBookClickListeners();
  }

  function attachBookClickListeners() {
    document.querySelectorAll('.book-cover').forEach(function (cover) {
      cover.addEventListener('click', function () {
        const bookId = parseInt(this.dataset.id);
        fetchBookDetails(bookId);
      });
    });
  }

  function fetchBookDetails(bookId) {
    // Wyświetlanie wskaźnika ładowania
    showLoadingIndicator();

    fetch(`http://localhost:8080/stephen-king/api/book/${bookId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((book) => {
        hideLoadingIndicator();
        showBookModal(book);
      })
      .catch((error) => {
        hideLoadingIndicator();
        console.error("Error fetching book details:", error);
      });
  }

  function showBookModal(book) {
    document.getElementById('bookModalLabel').innerText = book.title;
    document.getElementById('bookDescription').innerText = book.description;
    document.getElementById('bookPublisher').innerText = book.publisher;
    document.getElementById('bookYear').innerText = book.year;
    document.getElementById('bookPages').innerText = book.pages;
    document.getElementById('bookIsbn').innerText = book.isbn;

    $('#bookModal').addClass('fade-in');
    $('#bookModal').modal('show');

    $('#bookModal').on('click', function (event) {
      if ($(event.target).hasClass('modal')) {
        event.stopPropagation();
      }
    });
  }

  function showLoadingIndicator() {
    loadingIndicator.style.display = "block";
  }

  function hideLoadingIndicator() {
    loadingIndicator.style.display = "none";
  }
});
