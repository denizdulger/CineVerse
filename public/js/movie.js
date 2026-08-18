console.log("movie.js çalıştı");
console.log(window.location.href);
import { parseJwtNode } from "./common.js";

const params = new URLSearchParams(window.location.search);

console.log(params.get("id"));

const movieId = params.get("id");

const baseUrl = "https://image.tmdb.org/t/p/w440_and_h660_face";

async function getMovie() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMBD_API_TOKEN}`,
      },
    }
  );
  const movieCreditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGE3ZTNhOGQ3ZjdkNzNiZGNkYzQxZmE1ZmFlY2RiZiIsIm5iZiI6MTc4NDYxODQ5OC40LCJzdWIiOiI2YTVmMWUwMjgyOTdhMWQwZjEzMzM0YTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.w6etp5xgPP7C3aO0J4Udcs05_Lo0T6gw8UswFkGZboI",
      },
    }
  );

  console.log(response.status);
  const movie = await response.json();
  const movieCredits = await movieCreditsResponse.json();
  console.log("Movie Credits", movieCredits);
  console.log(movie);
  document.getElementById("title").textContent = movie.title;

  document.getElementById("poster").src = baseUrl + movie.poster_path;

  document.getElementById("overview").textContent = movie.overview;

  document.getElementById("rating").textContent =
    "⭐ " + movie.vote_average.toFixed(1);

  document.getElementById("date").textContent = movie.release_date;
  document.getElementById("runtime").textContent =
    "⏱️ " + movie.runtime + " min";
  const castContainer = document.getElementById("cast");

  movieCredits.cast.slice(0, 6).forEach((actor) => {
    castContainer.innerHTML += `
        <div class="actor">
            <img src="${baseUrl}${actor.profile_path}" alt="${actor.name}">
            <p>${actor.name}</p>
            <small>${actor.character}</small>
        </div>
    `;
  });

  const jwt = localStorage.getItem("token");
  const userInfo = jwt ? parseJwtNode(jwt) : null;
  console.log("JWT:", userInfo);

  document.querySelector("#add-watched").addEventListener("click", async () => {
    if (!userInfo) {
      window.location.href = "/login.html";
      return;
    }

    const response = await fetch("http://localhost:3001/api/movies/watched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${jwt}`,
      },
      body: JSON.stringify({
        movieId: movieId,
        userId: userInfo?.id,
      }),
    });

    const data = await response.json();
    console.log(data);
  });
}

getMovie();
