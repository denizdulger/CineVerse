console.log("movie.js çalıştı");
console.log(window.location.href);

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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGE3ZTNhOGQ3ZjdkNzNiZGNkYzQxZmE1ZmFlY2RiZiIsIm5iZiI6MTc4NDYxODQ5OC40LCJzdWIiOiI2YTVmMWUwMjgyOTdhMWQwZjEzMzM0YTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.w6etp5xgPP7C3aO0J4Udcs05_Lo0T6gw8UswFkGZboI",
      },
    }
  );
  console.log(response.status);
  const movie = await response.json();

  console.log(movie);
  document.getElementById("title").textContent = movie.title;

  document.getElementById("poster").src = baseUrl + movie.poster_path;

  document.getElementById("overview").textContent = movie.overview;

  document.getElementById("rating").textContent =
    "⭐ " + movie.vote_average.toFixed(1);

  document.getElementById("date").textContent = movie.release_date;
  document.getElementById("runtime").textContent =
    "⏱️ " + movie.runtime + " min";
}
getMovie();
