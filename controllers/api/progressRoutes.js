const router = require("express").Router();
const { Progress } = require("../../models");
const Auth = require("../../utils/auth");

// Retrieve a users progress from the database
router.get("/:user_id", Auth, async (req, res) => {
  try {
    const progressData = await Progress.findAll({
      where: { user_id: req.params.user_id },
    });
    const progressDataObj = progressData.map((data) =>
      data.get({ plain: true })
    );
    res.status(200).json({ progress: progressDataObj });
  } catch (err) {
    res
      .status(400)
      .json({
        message:
          "Unable to retrive users progess from the database. Error: " + err,
      });
  }
});

module.exports = router;
