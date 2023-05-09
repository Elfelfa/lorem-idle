const express = require('express');
const router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.render('home', { title: 'Lorem Idle', showLogin: false });
})

// Login page route.
router.get('/login', function (req, res) {
  res.render('home', { title: 'Login - Lorem Idle', showLogin: true });
})

module.exports = router;
