const { faker } = require('@faker-js/faker');
const dayjs = require('dayjs');
var fs = require('fs');

let userData = [];
let inventoryData = [];
let activeResourceData = [];
let progressData = [];

const createUserSeeds = async() => {
    try {
      for (var i = 1; i <= 100; i++) {
        // Creates user profile data
        // Places a timestamp on the user's account from their last active login.
        // For testing purposes this will start as the account creation timestamp.

        userData.push({
          username: faker.helpers.unique(faker.internet.userName),
          email: faker.helpers.unique(faker.internet.email),
          password: faker.internet.password(),
          timestamp: dayjs().format('YYYY/MM/DD/hh/mm/ss')
        });
        console.log("User " + i + " created.");

        // Creates progress entry for the user for each skill
        for (var sk = 1; sk <= 2; sk++)
        {
          progressData.push({
            user_id: i,
            skill_id: sk,
            tool_id: null,
            level: 1,
            experience: 0
          });
        };
        console.log("User " + i + " skill progress references created.");

        // Creates entry in joint table to specify which resource node is active for the user if any
        activeResourceData.push({
          user_id: i,
          resource_id: 1
        });
        console.log("User " + i + " active resource reference created.");

        // Creates the user's inventory
        for (var k = 1; k <= 18; k++) {
          inventoryData.push({
            user_id: i,
            item_id: k,
            item_amount: 0,
          });
          console.log("User " + i + " inventory " + k + " created.");
        }

        // Adds a place to store the player's coins.
        inventoryData.push({
          user_id: i,
          item_id: 1000,
          item_amount: 0
        });
        console.log("User " + i + " coin pouch created.");
      }

      userData.push({
        username: 'dev1',
        email: 'loremipsum@gmail.com',
        password: 'devpassword1',
        timestamp: dayjs().format('YYYY/MM/DD/hh/mm/ss')
      });
      console.log("Developer with id of " + i + " account created.");

      // Creates progress entry for the user for each skill
      for (var sk = 1; sk <= 2; sk++)
      {
        progressData.push({
          user_id: i,
          skill_id: sk,
          tool_id: null,
          level: 1,
          experience: 0
        });
      };
      console.log("Developer skill progress references created.");

      // Creates entry in joint table to specify which resource node is active for the user if any
      activeResourceData.push({
        user_id: i,
        resource_id: 1
      });
      console.log("Developer active resource reference created.");

      // Creates the user's inventory
      for (var k = 1; k <= 18; k++) {
        inventoryData.push({
          user_id: i,
          item_id: k,
          item_amount: 0,
        });
        console.log("Developer inventory " + k + " created.");
      }

      // Adds a place to store the player's coins.
      inventoryData.push({
        user_id: i,
        item_id: 1000,
        item_amount: 0
      });
      console.log("Developer coin pouch created.");

      fs.writeFileSync('./seeds/userData.json', JSON.stringify(userData));
      fs.writeFileSync('./seeds/progressData.json', JSON.stringify(progressData));
      fs.writeFileSync('./seeds/activeResourceData.json', JSON.stringify(activeResourceData));
      fs.writeFileSync('./seeds/inventoryData.json', JSON.stringify(inventoryData));
    } catch (err) {
      console.log("Unable to create user seeds");
      console.log(err);
    };
  };

createUserSeeds();