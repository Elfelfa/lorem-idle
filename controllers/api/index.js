const router = require('express').Router();

const userRoutes = require('./userRoutes');
const toolRoutes = require('./toolRoutes');
const skillRoutes = require('./skillRoutes');

router.use('/user', userRoutes);
router.use('/tool', toolRoutes);
router.use('/skill', skillRoutes);

module.exports = router;