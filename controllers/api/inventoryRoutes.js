const router = require("express").Router();
const { Inventory } = require("../../models");
const Auth = require("../../utils/auth");

// Endpoint to get all inventory items that the user owns
router.get("/", Auth, async (req, res) => {
  try {
    const inventoryData = await Inventory.findAll({
      where: { user_id: req.session.user_id },
    });
    const inventoryDataObj = inventoryData.map((data) =>
      data.get({ plain: true })
    );
    res.status(200).json({ inventory: inventoryDataObj });
  } catch (err) {
    res.status(400).json({ message: "Inable to get users inventory" + err });
  }
});

module.exports = router;
