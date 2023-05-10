
const express = require('express');
const router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.render('home', { title: 'Lorem Idle', showLogin: false });
})

router.get('/login', async (req, res) => { 
  try{
  res.status(200).render("login");
  } catch (err) {
    res.status(500).json({ message: "Unable to load login page from server. Error: " + err});
  }
});

router.get('/home', async (req, res) => {  //Add Auth helper after development.
  try{
  res.status(200).render("home");
  } catch (err) {
    res.status(500).json({ message: "Unable to load home page from server. Error: " + err});
  }
});

router.get('/splash', function (req, res) { //splash page route
  res.render('splash', { username: req.session.username });
})

router.get('/backpack', async (req, res) => { //Add Auth helper after development.
  try{
  res.status(200).render("backpack");
  } catch (err) {
    res.status(500).json({ message: "Unable to load backpack from server. Error: " + err});
  }
});



module.exports = router;


