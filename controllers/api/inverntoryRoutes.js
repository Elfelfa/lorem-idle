const router = require("express").Router();
const { Inventory } = require("../../models");
const Auth = require("../../utils/auth");

// Endpoint to get all inventory items that the user owns
router.get("/:user_id", Auth, async (req, res) => {
  try {
    const inventoryData = await Inventory.findAll({
      where: { user_id: req.params.id },
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
