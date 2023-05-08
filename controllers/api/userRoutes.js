const router = require('express').Router();
const { User } = require('../../models');

// Create a new User using a POST
router.post('/createuser')

// User Login using POST
router.post('/login')


// User logout using POST
router.post('/logout')

module.exports = router;
