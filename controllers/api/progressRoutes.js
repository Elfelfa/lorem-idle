const router = require("express").Router();
const { Progress } = require("../../models");
const Auth = require("../../utils/auth");

// Retrieve a users progress from the database
router.get("/", Auth, async (req, res) => {
  try {
    const progressData = await Progress.findAll({
      where: { user_id: req.session.user_id },
    });
    const progressDataObj = progressData.map((data) =>
      data.get({ plain: true })
    );
    res.status(200).json({ progress: progressDataObj });
  } catch (err) {
    res.status(400).json({
      message:
        "Unable to retrive users progess from the database. Error: " + err,
    });
  }
});

// NOTE:: (James) attempting some other endpoints here but don't fully understand this progress part.

// Update all stats in progress where user_id using values passed in req.body
router.put("/update", Auth, async (req, res) => {
  try {
    const progressData = await Progress.update(
      { level: req.body.level, experience: req.body.experience },
      { returning: true, where: { user_id: req.session.user_id } } // TODO, Change req.parames.uesr_id to a session storage for better securtiy.
    );
    res.status(200).json(progressData);
  } catch (err) {
    res.status(400).json({
      message: "Unable to update progress table in database. Error: " + err,
    });
  }
});

module.exports = router;
