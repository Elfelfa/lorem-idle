const express = require("express");
const exphbs = require("express-handlebars");
const router = express.Router();
const Auth = require("../utils/auth");
const { Skill, Item, User, Tool, Resource, Progress, Inventory, Active_Resource } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.status(200).render("splash");
  } catch (err) {
    res.status(500).json({
      message: "Unable to load splash page from server. Error: " + err,
    });
  }
});

router.get("/login", async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json({
      message: "Unable to load login page from server. Error: " + err,
    });
  }
});

router.get("/home", async (req, res) => {
  //Add Auth helper after development.
  try {
    res.render("home", { check: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
  }
});

router.get("/home/profile", async (req, res) => {
  //Add Auth helper after development.
  try {
    const userData = await User.findByPk('1', {
      include: [{model: Progress}]
    });
    console.log(userData.progresses);
    let totalEXP = userData.progresses[0].experience + userData.progresses[1].experience;
    let totalSkill = userData.progresses[0].level + userData.progresses[1].level;

    res.render(`partials/profile`, { check: false, username: userData.username, totalSkill: totalSkill, totalEXP: totalEXP }, (err, rawHTML) => {
      if(!err){
        console.log(rawHTML);
        res.send({ html: String(rawHTML) });
      } else {
        console.log(err);
      };
    });
    
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  };
});



module.exports = router;
