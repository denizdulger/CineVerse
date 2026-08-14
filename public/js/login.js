const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;
  console.log("Form gönderildi");
  console.log(email);
  console.log(password);
  console.log(email, password);
  const response = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    localStorage.setItem("token", data.token);

    window.location.href = "/index.html";
  } else {
    alert(data.error);
  }
});
