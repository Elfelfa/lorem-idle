const router = require("express").Router();
const { Skill } = require("../../models");
const Auth = require("../../utils/auth");

// Endpoint to GET all skills
router.get("/", Auth, async (req, res) => {
  try {
    const skillData = await Skill.findAll();
    const skillDataObj = skillData.map((data) => data.get({ plain: true }));
    res.status(200).json(skillDataObj);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Error in getting all skills from the database. Error: " + err,
      });
  }
});

// Endpoint to GET a skill by id
router.get("/:id", Auth, async (req, res) => {
  try {
    const skillData = await Skill.findByPk(req.params.id);
    res.status(200).json({ skillData });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Unable to get skill by id from the database. Error: " + err,
      });
  }
});

module.exports = router;
