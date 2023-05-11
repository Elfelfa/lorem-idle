const express = require("express");
const exphbs = require("express-handlebars");
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
    console.log("I'm here.");
    res.render('partials/profile', { check: false }, (err, rawHTML) => {
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
