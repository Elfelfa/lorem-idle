
const express = require('express');
const router = express.Router();
const Auth = require('../utils/auth')

// // Home page route.
// router.get('/', function (req, res) {
//   res.render('home', { title: 'Lorem Idle', showLogin: false });
// })

// // Login page route.
// router.get('/login', function (req, res) {
//   res.render('home', { title: 'Login - Lorem Idle', showLogin: true });
// })

router.get('/', async (req, res) => {
  try {
  res.status(200).render("splash");
  } catch (err) {
    res.status(500).json({ message: "Unable to load splash page from server. Error: " + err});
  }
});

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



module.exports = router;


