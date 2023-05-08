const router = require("express").Router();
const { Tool } = require("../../models");
const Auth = require("../../utils/auth");

// Endpoint to GET all tools that are returned in an object
router.get("/", Auth, async (req, res) => {
  try {
    const toolData = await Tool.findAll();
    const toolDataObj = toolData.map((data) => data.get({ plain: true }));
    res.status(200).json({ toolDataObj });
  } catch (err) {
    res.status(400).json({ message: "Unable to get all tools" + err });
  }
});

// Endpoint to GET a single Tool by id
router.get("/:id", Auth, async (req, res) => {
  try {
    const toolData = await Tool.findByPk(req.params.id);
    res.status(200).json({ tool: toolData });
  } catch (err) {
    res.status(400).json({ message: "Unable to find tool" + err });
  }
});

// Endpoint to GET tools by skill id
router.get("byskill/:skill_id", Auth, async (req, res) => {
  try {
    const toolData = await Tool.findAll({
      where: { skill_id: req.params.skill_id },
    });
    const toolDataObj = toolData.map((data) => data.get({ plain: true }));
    res.status(200).json({ toolDataObj });
  } catch (err) {
    res.status(400).json({ message: "Unable to find tools by skill id" + err });
  }
});

// Endpoint to GET value of a tool by id
router.get("/value/:id", Auth, async (req, res) => {
  try {
    const toolData = await Tool.findByPk(req.params.id, {
      attributes: ["value"],
    });
    res.status(200).json(toolData);
  } catch (err) {
    res.status(400).json({ message: "Unable to find value of tool" + err });
  }
});

module.exports = router;
