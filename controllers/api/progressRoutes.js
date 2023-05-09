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
    console.log(err);
    res.status(400).json({
      message: "Unable to retrive users progess from the database. Error: ",
    });
  }
});

// NOTE:: (James) attempting some other endpoints here but don't fully understand this progress part.

// Update all stats in progress where user_id using values passed in req.body
router.put("/update", Auth, async (req, res) => {
  try {
    const { level, experience } = req.body;
    if (!Number.isInteger(level) || !Number.isInteger(experience)) {
      res.status(400).json({ message: "Invalid input data." });
      return;
    }
    await Progress.update(
      { level, experience },
      { where: { user_id: req.session.user_id } }
    );
    res.status(200).json({ message: "Progress updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to update progress data." });
  }
});

module.exports = router;
