const router = require('express').Router();

const userRoutes = require('./userRoutes');
const toolRoutes = require('./toolRoutes');
const skillRoutes = require('./skillRoutes');
const inventoryRoutes = require('./inverntoryRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/user', userRoutes);
router.use('/tool', toolRoutes);
router.use('/skill', skillRoutes);
router.use('/inventory', inventoryRoutes);
router.use('item', itemRoutes);

module.exports = router;