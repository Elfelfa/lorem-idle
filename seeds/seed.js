const sequelize = require("../config/connection");
const {
  User,
  Inventory,
  Item,
  Resource,
  Skill,
  Tool,
  Progress,
} = require("../models");

const userData = require("./userData.json");
const inventoryData = require("./inventoryData.json");
const itemData = require("./itemData.json");
const resourceData = require("./resourceNodeData.json");
const skillData = require("./skillData.json");
const toolData = require("./toolData.json");
const progressData = require("./progressData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const inventory = await Inventory.bulkCreate(inventoryData, {
      returning: true,
    });

    const items = await Item.bulkCreate(itemData, {
      returning: true,
    });

    const resources = await Resource.bulkCreate(resourceData, {
      returning: true,
    });

    const skills = await Skill.bulkCreate(skillData, {
      returning: true,
    });

    const tools = await Tool.bulkCreate(toolData, {
      returning: true,
    });

    const progress = await Progress.bulkCreate(progressData, {
      returning: true,
    });

    process.exit(0);
    
  } catch (err) {
    console.log("Unable to seed database");
    console.log(err);
  }
};

seedDatabase();
