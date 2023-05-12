const helpers = require("../../utils/helpers");
const experienceChart = require("../../assets/experience.json");
const docBody = document.body;

// Server tick rate in milliseconds 
const tickRate = 600;

var player = {
    activeResource: undefined,
    woodcuttingLevel: undefined,
    woodcuttingEXP: undefined,
    fishingLevel: undefined,
    fishingEXP: undefined,
    inventory: {
        logs: undefined,
        oakLogs: undefined,
        willowLogs: undefined,
        teakLogs: undefined,
        mapleLogs: undefined,
        mahoganyLogs: undefined,
        yewLogs: undefined,
        magicLogs: undefined,
        redwoodLogs: undefined,
        shrimp: undefined,
        herring: undefined,
        anchovies: undefined,
        trout: undefined,
        salmon: undefined,
        lobsters: undefined,
        swordfish: undefined,
        monkfish: undefined,
        sharks: undefined
    },
    gp: undefined,
    tools: {
        woodcutting: undefined,
        fishing: undefined
    }
};

const profileBtn = async (e) => {
    e.preventDefault();
    const response = await fetch("/home/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");

        if (checkNodes) {
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

        if (checkNodes) {
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

// Function to fetch shop data
const shopBtn = async (e) => {
    e.preventDefault();
    const response = await fetch("/home/shop", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      const checkNodes = await document.getElementById("oldNode");
  
      if (checkNodes) {
        checkNodes.parentNode.removeChild(checkNodes);
      }
  
      const data = await response.json();
      const rawHTML = data.html;
      const myThing = document.createElement("div");
      myThing.innerHTML = rawHTML;
      docBody.appendChild(myThing);
  
      while (myThing.firstChild) {
        myThing.parentNode.insertBefore(myThing.firstChild, myThing);
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

        if (checkNodes) {
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

        if (checkNodes) {
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



const loginUpdate = async () => {
    const userData = await fetch(`/api/user/myData`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (userData.ok) {

        player.activeResource = userData.active_resource.id;
        player.woodcuttingLevel = userData.progresses[0].level;
        player.woodcuttingEXP = userData.progresses[0].experience;
        player.fishingLevel = userData.progresses[1].level;
        player.fishingEXP = userData.progresses[1].level;
        player.gp = userData.inventories[userData.inventories.length - 1].item_amount;
        player.tools.woodcutting = userData.progresses[0].tool_id;
        player.tools.fishing = userData.progresses[1].tool_id;

        for (let a = 0; a < player.inventory.length - 1; a++) {
            player.inventory[a] = userData.inventories[a].item_amount;
        }

        var timePassed = await helpers.calcTimePassed(userData);
        var iterations = 0;

        //add authentication function if we have time. Code snippet in discord.

        // Calculates remaining time needed for previous resource being excavated to complete
        // Subtracts that time from timePassed and iterates iterations by 1.
        // Divides timePassed by the active resource's time it takes to complete and adds that many iterations to iterations variable.

        timePassed -= floor(userData.active_resource.seconds_to_complete - userData.active_resource.activeResource.progress);
        iterations++;
        iterations += floor(parseFloat(timePassed) / parseFloat(userData.active_resource.seconds_to_complete));

        if(userData.active_resource.skill_id == 1) {
            player.woodcuttingEXP += (iterations * userData.active_resource.exp_reward);

            if (player.woodcuttingEXP > experienceChart[player.woodcuttingLevel]) {
                player.woodcuttingLevel++;
            };
        } else {
            player.fishingEXP += (iterations * userData.active_resource.exp_reward);

            if (player.fishingEXP > experienceChart[player.fishingLevel]) {
                player.fishingLevel++;
            };
        }

        player.inventory[userData.active_resource.item_id-1] += iterations;

        const response = await fetch(`/api/user/update`, {
            method: "UPDATE",
            body: { player },
            headers: { "Content-Type": "application/json" },
        });
    } else {
        alert("Error when processing login update request!");
    }
};

const tickUpdate = async (e) => {

};

document.addEventListener("DOMContentLoaded", async () => {
    document.querySelector("#profile-btn").addEventListener("click", profileBtn);
    document.querySelector("#backpack-btn").addEventListener("click", backpackBtn);
    document.querySelector("#woodcutting-btn").addEventListener("click", woodcuttingBtn);
    document.querySelector("#fishing-btn").addEventListener("click", fishingBtn);
    document.querySelector("#shop-btn").addEventListener("click", shopBtn);

    loginUpdate();
    setInterval(tickUpdate, tickRate);
});