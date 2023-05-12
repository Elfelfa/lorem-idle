const sequelize = require("../config/connection");
const {
  Skill,
  Item,
  User,
  Tool,
  Resource,
  Progress,
  Inventory,
  Active_Resource,
  Experience
} = require("../models");

const userData = require("./userData.json");
const inventoryData = require("./inventoryData.json");
const itemData = require("./itemData.json");
const resourceData = require("./resourceNodeData.json");
const skillData = require("./skillData.json");
const toolData = require("./toolData.json");
const progressData = require("./progressData.json");
const activeResourceData = require("./activeResourceData.json");
const experienceData = require("./experienceData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const skills = await Skill.bulkCreate(skillData, {
      returning: true,
    });

    const items = await Item.bulkCreate(itemData, {
      returning: true,
    });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const tools = await Tool.bulkCreate(toolData, {
      returning: true,
    });

    const resources = await Resource.bulkCreate(resourceData, {
      returning: true,
    });

    const progress = await Progress.bulkCreate(progressData, {
      returning: true,
    });

    const inventory = await Inventory.bulkCreate(inventoryData, {
      returning: true,
    });

    const activeResource = await Active_Resource.bulkCreate(activeResourceData, {
      returning: true,
    });

    const exp = await Experience.bulkCreate(experienceData, {
      returning: true,
    });


    process.exit(0);
    
  } catch (err) {
    console.log("Unable to seed database");
    console.log(err);
  }
};

seedDatabase();
