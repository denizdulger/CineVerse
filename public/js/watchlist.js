import { parseJwtNode } from "./common.js";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

const userInfo = parseJwtNode(token);

async function getWatchedMovies() {
  const watchedMoviesContainer = document.getElementById("watchedMovies");

  try {
    const response = await fetch("/api/movies/watched", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const movies = await response.json();

    console.log("WATCHED MOVIES:", movies);

    if (!response.ok) {
      console.error(movies.error);
      return;
    }

    if (movies.length === 0) {
      watchedMoviesContainer.innerHTML =
        "<p class='empty-message'>You haven't watched any movies yet.</p>";
      return;
    }

    for (const movie of movies) {
      const movieResponse = await fetch(
        `http://localhost:3001/api/movies/${movie.movie_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const movieData = await movieResponse.json();

      const movieElement = document.createElement("div");

      movieElement.classList.add("movie-card");

      movieElement.innerHTML = `
        <img
          class="poster"
          src="https://image.tmdb.org/t/p/w440_and_h660_face${movieData.poster_path}"
          alt="${movieData.title}"
        />

        <div class="movie-description">
          <div class="movie-title-row">
            <h2 class="title">${movieData.title}</h2>
            <span class="rating">
              
            </span>
          </div>

          <p class="overview">
            ${movieData.overview}
          </p>

          <p class="date">
            📅 ${movieData.release_date}
          </p>
        </div>
      `;

      watchedMoviesContainer.appendChild(movieElement);
    }
  } catch (err) {
    console.error("Watched movies error:", err);
  }
}

getWatchedMovies();
