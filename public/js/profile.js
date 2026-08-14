import { parseJwtNode } from "./common.js";

const token = localStorage.getItem("token");

console.log("TOKEN:", token);

const userInfo = parseJwtNode(token);

console.log("USER INFO:", userInfo);

if (userInfo) {
  // Kullanıcı adı
  if (userInfo.username) {
    document.getElementById("profileUsername").textContent = userInfo.username;
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
