const docBody = document.body;

let lastEvent;
let experienceChart;


// Server tick rate in milliseconds 
const tickRate = 2000;

var player = {
    activeResource: undefined,
    woodcuttingLevel: undefined,
    woodcuttingEXP: undefined,
    fishingLevel: undefined,
    fishingEXP: undefined,
    inventory: [
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined
    ],
    gp: undefined,
    tools: {
        woodcutting: 1.0,
        fishing: 1.0
    },
    currentPage: 0,
    progress: 0,
    timeToComplete: 0,
    resourceEXP: 0,
    resourceItem: 0,

    ////////// CURRENT PAGE //////////////
    //    0 = splash
    //    1 = profile
    //    2 = backpack
    //    3 = shop
    //    4 = woodcutting
    //    5 = fishing
    //////////////////////////////////////
};

const profileBtn = async (e) => {
    e.preventDefault();

    player.currentPage = 1;

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

    player.currentPage = 2;

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

    player.currentPage = 3;

    const response = await fetch("/home/shop", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");


        const inject = await htmlInjection(checkNodes, response);

        const shopClick = (data) => {
            console.log(data.parentElement.getAttribute("data-id"));
        };
        const shopBtns = document.getElementById("shopCardHolster");

        shopBtns.addEventListener('click', function (e) {
            if (e.target && (e.target.matches("div") || (e.target.matches("img")))) {
                e.stopPropagation();
                shopClick(e.target);
            }
        });
    } else {
        alert("Unable to load profile");
    }
};

const woodcuttingBtn = async (e) => {
    if (e) {
        e.preventDefault();
    }

    player.currentPage = 4;

    const response = await fetch("/home/woodcutting", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");
        const inject = await htmlInjection(checkNodes, response);

        const woodcuttingClick = (data) => {
            console.log(data.parentElement.getAttribute("data-id"));
        };
        const woodcuttingBtns = document.getElementById("woodcuttingCardHolster");

        woodcuttingBtns.addEventListener('click', function (e) {
            if (e.target && (e.target.matches("div") || (e.target.matches("img")))) {
                e.stopPropagation();
                woodcuttingClick(e.target);
            }
        });
    } else {
        alert("Unable to load profile");
    }
};

const fishingBtn = async (e) => {
    e.preventDefault();

    player.currentPage = 5;

    const response = await fetch("/home/fishing", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const checkNodes = await document.getElementById("oldNode");


        const inject = await htmlInjection(checkNodes, response);

        const fishingClick = (data) => {
            console.log(data.parentElement.getAttribute("data-id"));
        };
        const fishingBtns = document.getElementById("fishingCardHolster");

        fishingBtns.addEventListener('click', function (e) {
            if (e.target && (e.target.matches("div") || (e.target.matches("img")))) {
                e.stopPropagation();
                fishingClick(e.target);
            }
        });

    } else {
        alert("Unable to load profile");
    }
};



const loginUpdate = async () => {
    const response = await fetch(`/api/user/myData`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const userData = await response.json();


    if (response.ok) {
        player.activeResource = userData.active_resource[0].id;
        player.woodcuttingLevel = userData.progresses[0].level;
        player.woodcuttingEXP = userData.progresses[0].experience;
        player.fishingLevel = userData.progresses[1].level;
        player.fishingEXP = userData.progresses[1].experience;
        player.gp = userData.inventories[userData.inventories.length - 1].item_amount;
        player.tools.woodcutting = userData.progresses[0].tool_id;
        player.tools.fishing = userData.progresses[1].tool_id;


        for (let a = 0; a < player.inventory.length; a++) {
            player.inventory[a] = userData.inventories[a].item_amount;
        }

        player.gp = userData.inventories[18].item_amount;

        var timePassed = await calcTimePassed(userData);

        if (player.activeResource) {
            player.timeToComplete = userData.active_resource[0].seconds_to_complete;
            player.resourceEXP = userData.active_resource[0].exp_reward;
            player.resourceItem = userData.active_resource[0].item_id - 1;


            var updateObj = {
                updateTime: timePassed,
                totalWC: 0,
                totalFSH: 0,
                totalExp: 0,
                totalItems: 0
            }

            var iterations = 0;

            //add authentication function if we have time. Code snippet in discord.

            // Calculates remaining time needed for previous resource being excavated to complete
            // Subtracts that time from timePassed and iterates iterations by 1.
            // Divides timePassed by the active resource's time it takes to complete and adds that many iterations to iterations variable.

            timePassed -= Math.floor(userData.active_resource[0].seconds_to_complete - parseFloat(userData.active_resource[0].activeResource.progress));
            iterations++;


            iterations += Math.floor(parseFloat(timePassed) / parseFloat(userData.active_resource[0].seconds_to_complete));
            updateObj.totalItems = iterations;

            if (userData.active_resource[0].skill_id == 1) {
                updateObj.totalExp += (iterations * userData.active_resource[0].exp_reward);
                player.woodcuttingEXP += updateObj.totalExp;


                while (true) {
                    if (player.woodcuttingEXP > experienceChart[player.woodcuttingLevel]) {
                        player.woodcuttingLevel++;
                        updateObj.totalWC++;
                    } else {
                        break;
                    };
                }
            } else if (userData.active_resource[0].skill_id == 2) {
                updateObj.totalExp += (iterations * userData.active_resource[0].exp_reward);
                player.fishingEXP += updateObj.totalExp;

                while (true) {
                    if (player.fishingEXP > experienceChart[player.fishingLevel]) {
                        player.fishingLevel++;
                        updateObj.totalFSH++;
                    } else {
                        break;
                    };
                }
            }


            player.inventory[userData.active_resource[0].item_id - 1] += iterations;
        }

        const updateResponse = await fetch(`/api/user/loginUpdate`, {
            method: "PUT",
            body: JSON.stringify({ player }),
            headers: { "Content-Type": "application/json" },
        });

        if (updateResponse.ok) {
            const renderResponse = await fetch("/home/init", {
                method: "PUT",
                body: JSON.stringify({ player, updateObj }),
                headers: { "Content-Type": "application/json" },
            });

            console.log('init passed');

            if (renderResponse.ok) {
                const checkNodes = await document.getElementById("oldNode");


                const inject = await htmlInjection(checkNodes, renderResponse);
            };
        };
    } else {
        alert("Error when processing login update request: ");
    }
};

const tickUpdate = async (e) => {
    try {
        const tUpdateRes = await fetch("/home/tickUpdate", {
            method: "PUT",
            body: JSON.stringify({ player }),
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.log(err);
    }

    console.log(player.currentPage);



    if (player.currentPage === 4) {
        const test = await woodcuttingBtn();
    } else if (player.currentPage === 5) {
        fishingBtn();
    };
};

const calcTimePassed = async (data) => {

    /////////////////////////////////////////
    // Timestamp array index definitions:  //
    // 0: YYYY                             //
    // 1: MM                               //
    // 2: DD                               //
    // 3: hh                               //
    // 4: mm                               //
    // 5: ss                               //
    /////////////////////////////////////////

    var oldTS = data.timestamp.split('/');
    var t = dayjs().format('YYYY/MM/DD/hh/mm/ss');
    var newTS = t.split('/');


    console.log(oldTS);
    console.log(newTS);

    var timePassed;

    // Loop that converts the timestamp arrays into integers.

    for (var k = 0; k < oldTS.length; k++) {
        oldTS[k] = parseInt(oldTS[k]);
        newTS[k] = parseInt(newTS[k]);
    };


    console.log(oldTS);
    console.log(newTS);

    if ((newTS[0] - oldTS[0]) <= 0) {
        if ((newTS[1] - oldTS[1]) <= 0) {
            if ((newTS[2] - oldTS[2]) <= 1) {
                if ((newTS[3] - oldTS[3]) < 0 || ((newTS[3] - oldTS[3]) === 0 && (newTS[4] - oldTS[4]) < 0)) {
                    var hours = ((newTS[3] - oldTS[3]) + 24);
                    var minutes = ((60 - oldTS[4]) + newTS[4]);
                    var seconds = ((60 - oldTS[5]) + newTS[5]);

                    if (minutes > 59) {
                        hours += Math.floor(minutes / 60);
                        minutes = (minutes % 60);
                    }

                    if (seconds > 59) {
                        minutes += Math.floor(seconds / 60);
                        seconds = (seconds % 60);
                    }

                    timePassed = (((hours * 60) * 60) + (minutes * 60) + seconds);
                } else {
                    var hours = (newTS[3] - oldTS[3]);
                    var minutes = (newTS[4] - oldTS[4]);
                    var seconds = (newTS[5] - oldTS[5]);

                    if (minutes < 0) {
                        hours -= 1;
                        minutes += 60;
                    }

                    if (seconds < 0) {
                        minutes -= 1;
                        seconds += 60;
                    }

                    timePassed = (((hours * 60) * 60) + (minutes * 60) + seconds);
                }
            } else {
                timePassed = ((24 * 60) * 60); // more than one day has passed
            }
        } else {
            timePassed = ((24 * 60) * 60); // more than one month has passed
        }
    } else {
        timePassed = ((24 * 60) * 60); // more than one year has passed
    }

    console.log(timePassed);

    return timePassed;
};


const shopClick = (data) => {
    console.log(data);
};

document.addEventListener("DOMContentLoaded", async () => {


    document.querySelector("#profile-btn").addEventListener("click", profileBtn);
    document.querySelector("#backpack-btn").addEventListener("click", backpackBtn);
    document.querySelector("#woodcutting-btn").addEventListener("click", woodcuttingBtn);
    document.querySelector("#fishing-btn").addEventListener("click", fishingBtn);
    document.querySelector("#shop-btn").addEventListener("click", shopBtn);



    const response = await fetch("/api/user/expChart", {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    });


    experienceChart = await response.json();

    loginUpdate();
    setInterval(async () => {
        player.progress += 2;
        if (player.progress >= player.timeToComplete) {
            player.progress = 0;

            if (player.resourceItem <= 8) {
                player.woodcuttingEXP += player.resourceEXP;
            } else {
                player.fishingEXP += player.resourceEXP;
            }

            if (player.resourceItem <= 8) {
                player.woodcuttingEXP += player.resourceEXP;

                while (true) {
                    if (player.woodcuttingEXP > experienceChart[player.woodcuttingLevel]) {
                        player.woodcuttingLevel++;
                    } else {
                        break;
                    };
                }
            } else {
                player.fishingEXP += player.resourceEXP;

                while (true) {
                    if (player.fishingEXP > experienceChart[player.fishingLevel]) {
                        player.fishingLevel++;
                    } else {
                        break;
                    };
                }
            }

            player.inventory[player.resourceItem] += 1;
        }

        const tUpdateRes = await fetch("/home/tickUpdate", {
            method: "PUT",
            body: JSON.stringify({ player }),
            headers: { "Content-Type": "application/json" },
        });

        if (player.currentPage === 4) {
            const refreshR = await fetch("/home/woodcutting", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const checkNodes = await document.getElementById("oldNode");
            const inject = await htmlInjection(checkNodes, refreshR);
        }
    }, tickRate);
});

const htmlInjection = async (checkNodes, response) => {
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

};