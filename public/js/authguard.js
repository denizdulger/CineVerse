import { parseJwtNode } from "./common.js";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

const userInfo = parseJwtNode(token);

if (!userInfo) {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}

if (userInfo.exp && userInfo.exp * 1000 < Date.now()) {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}
