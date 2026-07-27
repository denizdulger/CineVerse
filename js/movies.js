const baseUrl = "https://image.tmdb.org/t/p/w440_and_h660_face";

async function getMovies() {
    const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGE3ZTNhOGQ3ZjdkNzNiZGNkYzQxZmE1ZmFlY2RiZiIsIm5iZiI6MTc4NDYxODQ5OC40LCJzdWIiOiI2YTVmMWUwMjgyOTdhMWQwZjEzMzM0YTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.w6etp5xgPP7C3aO0J4Udcs05_Lo0T6gw8UswFkGZboI",
            },
        },
    );
    const data = await response.json();
    console.log(data);

    //MOvies div diye değişken oluşturuldu. İçine document.getelementbyid ile movies idli divi seçtik ve değişkene eşitledik
    let moviesDiv = document.getElementById("movies");
    //movies divini gittik innerHTML yani normal şartlarda <div id="movies">innerHTML </div>

    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].id.toString() === "261639") {
            continue;
        }
        console.log(data.results[i].title);
        console.log("Film ID:", data.results[i].id);
        console.log(`movie.html?id=${data.results[i].id}`);
        moviesDiv.innerHTML += `
    <a class="movie-card" href="movie.html?id=${data.results[i].id}">
      <img class='poster' src='${
          baseUrl + data["results"][i]["poster_path"]
      }'/> 
      <div class="movie-description">
         <div class="movie-info">
          <h2 class="title">${data.results[i].title}</h2>

          <p class="rating">
            ⭐ ${data.results[i].vote_average.toFixed(1)}
          </p>
         </div>

          <p class="overview">
            ${data.results[i].overview}
          </p>
      </div>
   </a>
    `;
    }
    console.log(moviesDiv);
}

getMovies();

/*

const movies = [
  {
    movie_name: "The Odyssey",
    description: "Christopher nolanın 2026 filmi",
    imdb_puani: 8.2,
    publish_year: 2026,
    imax: true,
    cast: ["Matt damon", "brad pitt", "zendaya"],
    director: "Christopher Nolan",
    categories: ["Action Epic", "Adventure Epic", "Dark Fantasy"],
  },
  {
    movie_name: "Troy",
    description: "Christopher nolanın 2026 filmi",
    imdb_puani: 8.2,
    publish_year: 2026,
    imax: true,
    cast: [
      {
        name: "Matt Damon",
        age: "37",
      },
      {
        name: "Zendaya",
        age: "25",
      },
      {
        name: "Brad Pit",
        age: "50",
      },
    ],
    director: "Christopher Nolan",
    categories: ["Action Epic", "Adventure Epic", "Dark Fantasy"],
  },
];
console.log(movies[1]["cast"][0]["name"]);
*/
