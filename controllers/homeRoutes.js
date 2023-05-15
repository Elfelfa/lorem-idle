const express = require("express");
const exphbs = require("express-handlebars");
const router = express.Router();
const Auth = require("../utils/auth");
const sequelize = require('../config/connection');
const dayjs = require('dayjs');

const {
  Skill,
  Item,
  User,
  Tool,
  Resource,
  Progress,
  Inventory,
  Active_Resource,
} = require("../models");
const expChart = require("../assets/experience.json");



router.get("*", async (req, res) => {
  try {
    res.render("login", { check: true });
  } catch (err) {
    throw err;
  }
});

router.get("/home", async (req, res) => {
  try {
    res.render("home", { check: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  }
});

router.put("/home/init", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);


    console.log(req.body.updateObj.updateTime);

    totalHours = Math.floor(parseFloat(((req.body.updateObj.updateTime / 60) / 60)));
    totalMinutes = Math.floor(parseFloat((req.body.updateObj.updateTime - (totalHours * 60 * 60)) / 60));
    totalSeconds = Math.ceil(parseFloat(req.body.updateObj.updateTime - (totalHours * 60 * 60) - (totalMinutes * 60)));

    if (totalSeconds === 60) {
      totalSeconds = 0;
      totalMinutes++;
    }

    if (totalMinutes === 60) {
      totalMinutes = 0;
      totalHours++;
    }

    totalTime = `${totalHours}h ${totalMinutes}m ${totalSeconds}s`;

    res.render("partials/splash",
      {
        check: false, username: userData.username,
        timeAway: totalTime, totalEXP: req.body.updateObj.totalExp,
        totalItems: req.body.updateObj.totalItems, totalWC: req.body.updateObj.totalWC,
        totalFSH: req.body.updateObj.totalFSH
      },
      (err, rawHTML) => {
        if (!err) {
          // console.log(rawHTML);
          res.send({ html: String(rawHTML) });
        } else {
          console.log(err);
        }
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  }
});

router.get("/home/profile", async (req, res) => {
  //Add Auth helper after development.
  try {

    const userData = await User.findByPk(req.session.user_id, {

      include: [{ model: Progress }],
    });
    let totalEXP =
      userData.progresses[0].experience + userData.progresses[1].experience;
    let totalSkill =
      userData.progresses[0].level + userData.progresses[1].level;

    res.render(
      `partials/profile`,
      {
        check: false,
        username: userData.username,
        totalSkill: totalSkill,
        totalEXP: totalEXP,
      },
      (err, rawHTML) => {
        if (!err) {
          // console.log(rawHTML);
          res.send({ html: String(rawHTML) });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  }
});

router.put("/home/tickUpdate", async (req, res) => {
  try {
    const userData = await User.update(
      {
        timestamp: dayjs().format('YYYY/MM/DD/hh/mm/ss')
      },
      {
        where: { id: req.session.user_id }
      }
    );

    if (req.body.player.activeResource) {
      const progressDataWC = await Progress.update(
        {
          level: req.body.player.woodcuttingLevel,
          experience: req.body.player.woodcuttingEXP
        },
        {
          where: { user_id: req.session.user_id, skill_id: 1 }
        }
      );

      const progressDataFSH = await Progress.update(
        {
          level: req.body.player.fishingLevel,
          experience: req.body.player.fishingEXP
        },
        {
          where: { user_id: req.session.user_id, skill_id: 2 }
        }
      );

      let invArray = []

      for (let i = 0; i < 18; i++) {
        invArray.push({ amount: req.body.player.inventory[i], itemId: (i + 1) });
      };
      try {
        const inventoryData = await Promise.all(
          invArray.map((item, index) => {
            return Inventory.update(
              { item_amount: item.amount },
              { where: { user_id: req.session.user_id, item_id: item.itemId } }
            );
          })
        );
      } catch (err) {
        console.log(err);
      }


      const resourceData = await Active_Resource.update(
        {
          progress: req.body.player.progress
        },
        {
          where: { user_id: req.session.user_id }
        }
      )

    }

    res.status(200).json();
  } catch (err) {
    throw err;
  }
});

// Send users items to be rendered in the user's backpack
router.get("/home/backpack", async (req, res) => {
  try {
    const backpackData = await Inventory.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: {
        model: Item,
        attributes: {
          exclude: ["skill_id", "skill_name"],
        },
      },
    });

    let itemArray = [];
    for (let i = 0; i < 18; i++) {
      const newItemObj = {
        item: i,
        amount: backpackData[i].item_amount,
        name: backpackData[i].item.name,
        value: backpackData[i].item.value,
        item_icon: backpackData[i].item.item_icon,
      };
      itemArray.push(newItemObj);
    }

    res.render(
      "partials/backpack",
      {
        check: false,
        itemsObj: itemArray,
      },
      (err, rawHTML) => {
        if (!err) {
          res.send({ html: String(rawHTML) });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    throw err;
  }
});

// Send available tools to the shop partial.
router.get("/home/shop", async (req, res) => {
  try {
    const toolsData = await Tool.findAll();
    const toolsDataObj = toolsData.map((data) => data.get({ plain: true }));
    res.render(
      "partials/shop",
      {
        check: false,
        tool: toolsDataObj,
      },
      (err, rawHTML) => {
        if (!err) {
          res.send({ html: String(rawHTML) });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    throw err;
  }
});

router.get("/home/woodcutting", async (req, res) => {
  //Add Auth helper after development.
  try {

    const progressData = await Progress.findAll({
      where: {
        user_id: req.session.user_id,
        skill_id: 1,
      },
    });
    let totalEXP = progressData[0].experience;
    let totalSkill = progressData[0].level;

    console.log(progressData);

    const resourceData = await Resource.findAll({
      where: {
        skill_id: 1,
      },
    });

    const activeData = await Active_Resource.findOne({
      where: { user_id: req.session.user_id }
    })

    let wcResources = resourceData.map((data) => data.get({ plain: true }));
    let totalProg;

    console.log(wcResources);

    for (let i = 0; i < wcResources.length; i++) {
      if (activeData.resource_id === wcResources[i].id) {
        totalProg = ((parseFloat(activeData.progress / wcResources[i].seconds_to_complete)).toFixed(2) * 100).toFixed(2);
      }
    }
    console.log(activeData.progress);

    console.log(totalProg);

    res.render(
      `partials/woodcutting`,
      {
        check: false,
        currentEXP: totalEXP - expChart[totalSkill],
        progress: totalProg.toString(),
        level: totalSkill,
        expNeeded: expChart[totalSkill + 1] - expChart[totalSkill],
        activeTree: activeData.resource_id,
        resources: wcResources,
      },
      (err, rawHTML) => {
        if (!err) {
          res.send({ html: String(rawHTML) });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  }
});

router.get("/home/fishing", async (req, res) => {
  //Add Auth helper after development.
  try {
    let id = req.session.user_id.toString();
    const progressData = await Progress.findAll({
      where: {
        user_id: id,
        skill_id: 2,
      }
    });

    const itemIconData = await Item.findAll({ where: { skill_id: "2" } });

    const itemIconDataObj = itemIconData.map(data => data.get({ plain: true }));



    console.log(itemIconData[0].item_icon);



    let totalEXP = progressData[0].experience;
    let totalSkill = progressData[0].level;
    const resourceData = await Resource.findAll({
      where: {
        skill_id: 2,
      },
    });

    let fishResources = resourceData.map((data) => data.get({ plain: true }));


    const mergedData = resourceData.map(resource => {
      const itemIconData = itemIconDataObj.find(icon => icon.id === resource.item_id);
      return {
        ...resource,
        item_icon: itemIconData ? itemIconData.item_icon : null
      };
    });
    console.log(mergedData)

    res.render(
      `partials/fishing`,
      {
        check: false,
        currentEXP: totalEXP,
        level: totalSkill,
        expNeeded: expChart[totalSkill + 1],
        activeFish: 2,
        resources: mergedData
      },
      (err, rawHTML) => {
        if (!err) {
          res.send({ html: String(rawHTML) });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  }
});

module.exports = router;
