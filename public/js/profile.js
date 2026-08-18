import { parseJwtNode } from "./common.js";

const token = localStorage.getItem("token");

console.log("TOKEN:", token);

if (!token) {
  window.location.href = "/login";
}

const userInfo = parseJwtNode(token);

console.log("USER INFO:", userInfo);

// ==========================
// PROFILE INFORMATION
// ==========================

if (userInfo) {
  // Kullanıcı adı
  if (userInfo.username) {
    document.getElementById("profileUsername").textContent = userInfo.username;

    document.getElementById("profileAvatar").textContent = userInfo.username
      .slice(0, 1)
      .toUpperCase();
  }

  // Email
  if (userInfo.email) {
    document.getElementById("profileEmail").textContent = userInfo.email;
  }

  // Profil fotoğrafı
  if (userInfo.profile_image) {
    const avatar = document.getElementById("profileAvatar");

    const img = document.createElement("img");

    img.src = userInfo.profile_image;

    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    avatar.innerHTML = "";

    avatar.appendChild(img);
  }
}

// ==========================
// WATCHED MOVIES
// ==========================

async function getWatchedMovies() {
  const watchedMoviesContainer = document.getElementById("watchedMovies");

  try {
    const response = await fetch(`/api/movies/watched?userId=${userInfo.id}`, {
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
        "<p>Henüz izlediğiniz bir film yok.</p>";

      return;
    }

    movies.forEach((movie) => {
      const movieElement = document.createElement("div");

      movieElement.textContent = `Movie ID: ${movie.movie_id}`;

      watchedMoviesContainer.appendChild(movieElement);
    });
  } catch (err) {
    console.error("Watched movies error:", err);
  }
}

getWatchedMovies();
