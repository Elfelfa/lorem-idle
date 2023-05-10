const profileBtn = async (e) => {
  e.preventDefault();
  let id = e.target.getAttribute("data_id");
  const response = await fetch("/home", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert("Unable to load profile");
  }
};

const backpackBtn = async (e) => {
  e.preventDefault();
  let tab_id = e.target.getAttribute("data_id");
  console.log(JSON.stringify({tab_id}));
  const response = await fetch(`/home/${tab_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert("Unable to load backpack");
  }
};

const woodcuttingBtn = async (e) => {
  e.preventDefault();
  let id = e.target.getAttribute("data_id");
  const response = await fetch("/home", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert("Unable to load woodcutting");
  }
};

const fishingBtn = async (e) => {
  e.preventDefault();
  let id = e.target.getAttribute("data_id");
  const response = await fetch("/home", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert("Unable to load fishing");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#profile-btn").addEventListener("click", profileBtn);
  document.querySelector("#backpack-btn").addEventListener("click", backpackBtn);
  document
    .querySelector("#woodcutting-btn")
    .addEventListener("click", woodcuttingBtn);
  document.querySelector("#fishing-btn").addEventListener("click", fishingBtn);
});

