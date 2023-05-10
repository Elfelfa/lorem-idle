const express = require("express");
const router = express.Router();
const Auth = require("../utils/auth");

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
    res.status(200).render("home");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
  }
});

router.get("/home/:tab_id", async (req, res) => {
  //Add Auth helper after development.
  try {
    console.log(typeof req.params.tab_id);
    console.log(typeof parseInt(req.params.tab_id));
    if (req.params.tab_id) {
      switch (parseInt(req.params.tab_id)) {
        case 1:
          res.render("home", { profileTab: true });
          break;
        case 2:
          console.log("success");
          res.render("home", { backpackTab: "true" });
          break;
        case 3:
          res.render("home", { woodcuttingTab: true });
          break;
        case 4:
          res.render("home", { fishingTab: true });
          break;
      }

    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to load home page from server. Error: " + err });
    throw err;
  }
});

module.exports = router;
