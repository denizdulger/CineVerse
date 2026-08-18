import { parseJwtNode } from "./common.js";
import { logout } from "./logout.js";
import { searchMovies } from "./movieSearch.js";

fetch("/components/navbar.html")
  .then((res) => res.text())
  .then((html) => {
    document.querySelector("#navbar").innerHTML = html;

    const jwt = localStorage.getItem("token");
    const userInfo = jwt ? parseJwtNode(jwt) : null;

    const logoutButton = document.querySelector("#logout");
    const profileElement = document.querySelector("#profileMenu");
    const signInButton = document.querySelector("#signin-button");
    const movieSearchElement = document.querySelector("#movie-search");
    const avatarElement = document.querySelector(".avatar");

    // Kullanıcı giriş yapmamışsa
    if (!userInfo) {
      profileElement.style.display = "none";
      signInButton.style.display = "block";
    }

    // Kullanıcı giriş yapmışsa
    else {
      profileElement.style.display = "block";
      signInButton.style.display = "none";

      // Username
      if (userInfo.username) {
        document.querySelector("#username").textContent = userInfo.username;

        avatarElement.textContent = userInfo.username.slice(0, 1).toUpperCase();
      }

      // Profile image
      if (userInfo.profile_image) {
        const img = document.createElement("img");

        img.src = userInfo.profile_image;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        avatarElement.innerHTML = "";
        avatarElement.appendChild(img);
      }

      // Profile dropdown
      const profileMenu = document.getElementById("profileMenu");
      const dropdown = document.getElementById("dropdown");

      profileMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
      });

      dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      document.addEventListener("click", () => {
        dropdown.classList.remove("active");
      });

      logoutButton.addEventListener("click", logout);
    }

    // Movie search
    let searchTimeout;

    movieSearchElement.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();

      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        searchMovies(query);
      }, 700);
    });
  });
