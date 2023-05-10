
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
  res.render("sidebar");
  } catch (err) {
    throw err;
  }
})

module.exports = router;


