const docBody = document.body;

const profileBtn = async (e) => {
    e.preventDefault();
    const response = await fetch("/home/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");

        if(checkNodes)
        {
            checkNodes.parentNode.removeChild(checkNodes);
        }

        const data = await response.json();
        const rawHTML = data.html;
        const myThing = document.createElement('div');
        myThing.innerHTML = rawHTML;
        docBody.appendChild(myThing);

        while (myThing.firstChild) {
            myThing.parentNode.insertBefore(myThing.firstChild,
                myThing);
        }

        myThing.parentNode.removeChild(myThing);
    } else {
        alert("Unable to load profile");
    }
};

const backpackBtn = async (e) => {
    e.preventDefault();
    const response = await fetch(`/home/backpack`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");

        if(checkNodes)
        {
            checkNodes.parentNode.removeChild(checkNodes);
        }

        const data = await response.json();
        const rawHTML = data.html;
        const myThing = document.createElement('div');
        myThing.innerHTML = rawHTML;
        docBody.appendChild(myThing);

        while (myThing.firstChild) {
            myThing.parentNode.insertBefore(myThing.firstChild,
                myThing);
        }

        myThing.parentNode.removeChild(myThing);
    } else {
        alert("Unable to load profile");
    }
};

const woodcuttingBtn = async (e) => {
    e.preventDefault();
    const response = await fetch("/home/woodcutting", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");

        if(checkNodes)
        {
            checkNodes.parentNode.removeChild(checkNodes);
        }

        const data = await response.json();
        const rawHTML = data.html;
        const myThing = document.createElement('div');
        myThing.innerHTML = rawHTML;
        docBody.appendChild(myThing);

        while (myThing.firstChild) {
            myThing.parentNode.insertBefore(myThing.firstChild,
                myThing);
        }

        myThing.parentNode.removeChild(myThing);
    } else {
        alert("Unable to load profile");
    }
};

const fishingBtn = async (e) => {
    e.preventDefault();
    const response = await fetch("/home/fishing", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");

        if(checkNodes)
        {
            checkNodes.parentNode.removeChild(checkNodes);
        }
        
        const data = await response.json();
        const rawHTML = data.html;
        const myThing = document.createElement('div');
        myThing.innerHTML = rawHTML;
        docBody.appendChild(myThing);

        while (myThing.firstChild) {
            myThing.parentNode.insertBefore(myThing.firstChild,
                myThing);
        }

        myThing.parentNode.removeChild(myThing);
    } else {
        alert("Unable to load profile");
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