const baseUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";

async function getMovies() {
  const response = await fetch("https://api.themoviedb.org/3/discover/movie", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGE3ZTNhOGQ3ZjdkNzNiZGNkYzQxZmE1ZmFlY2RiZiIsIm5iZiI6MTc4NDYxODQ5OC40LCJzdWIiOiI2YTVmMWUwMjgyOTdhMWQwZjEzMzM0YTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.w6etp5xgPP7C3aO0J4Udcs05_Lo0T6gw8UswFkGZboI",
    },
  });
  data = await response.json();
  console.log(data);

  //MOvies div diye değişken oluşturuldu. İçine document.getelementbyid ile movies idli divi seçtik ve değişkene eşitledik
  let moviesDiv = document.getElementById("movies");
  //movies divini gittik innerHTML yani normal şartlarda <div id="movies">innerHTML </div>
  moviesDiv.innerHTML = `
  <a href='https://www.imdb.com/title/tt33764258/'>
    <div class='movie-card'>
     <img class='poster' src='${baseUrl + data["results"][0]["poster_path"]}'/> 

     <h2 class="title">${data.results[0].title}</h2>
     <p class="overview">${data.results[0].overview}</p>
     </div>
     </a>
  `;
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
