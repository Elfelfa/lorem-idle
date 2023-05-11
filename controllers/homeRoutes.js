const express = require("express");
const exphbs = require("express-handlebars");
const router = express.Router();
const Auth = require("../utils/auth");
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

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    throw err;
  }
});

router.get("/splash", async (req, res) => {
  try {
    res.redirect("/home");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  }
});

router.get("/home", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

    res.render("home", { check: true, username: userData.username });
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

    let id = req.session.user_id.toString();
    
    const userData = await User.findByPk(id, {
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
          console.log(rawHTML);
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

router.get("/home/woodcutting", async (req, res) => {
  //Add Auth helper after development.
  try {

    let id = req.session.user_id.toString();
    const progressData = await Progress.findAll({
      where: {
        user_id: id,
        skill_id: 1,
      },
    });
    console.log(progressData);
    let totalEXP = progressData[0].experience;
    let totalSkill = progressData[0].level;

    // const arData = await Active_Resource.findAll({
    //   where: {
    //     user_id: 1
    //   }
    // });

    const resourceData = await Resource.findAll({
      where: {
        skill_id: 1,
      },
    });

    let wcResources = resourceData.map((data) => data.get({ plain: true }));

    res.render(
      `partials/woodcutting`,
      {
        check: false,
        currentEXP: totalEXP,
        level: totalSkill,
        expNeeded: expChart[totalSkill + 1],
        activeTree: 1,
        resources: wcResources,
      },
      (err, rawHTML) => {
        if (!err) {
          //console.log(rawHTML);
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
