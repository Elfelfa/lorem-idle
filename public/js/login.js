const loginFunction = async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/home"); // TODO: Add endpoint to route the user to correct handlebars template.
    } else {
      alert("Unable to complete login.");
    }
  }
};

const signupFunction = async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email-signup").value.trim();
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    const timeUnix = Date.now();
    const timestamp = dayjs.unix(timeUnix).format("YYYY/MM/DD/hh/mm/ss");
    console.log(timeUnix);
    console.log(timestamp);

    if (email && username && password) {
        const response = await fetch("/api/user/createuser", {
            method: "POST",
            body: JSON.stringify({ username, email, password, timestamp }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/home"); // Use the same endpoint as the login above.
        } else {
            alert("Falied to create a new account.")
        }
    }
};

document.addEventListener("DOMContentLoaded", async () => {
document.querySelector(".login-form").addEventListener("submit", loginFunction);
document.querySelector(".signup-form").addEventListener("submit", signupFunction);
});