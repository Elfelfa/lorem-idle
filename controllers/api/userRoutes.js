const router = require("express").Router();
const { User } = require("../../models");

// Create a new User using a POST
router.post("/createuser", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res
      .status(200)
      .json({ message: "Unable to create a new user. Error: " + err });
  }
});

// User Login using POST
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect Username or Password" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect Username or Password" });
      return;
    }

    req.session.save(() => {
      (req.session.user_id = userData.id),
        (req.session.logged_in = true),
        res.json({ message: "Successfully logged in" });
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Unable to complete login. Error: " + err });
  }
});

// User logout using POST
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
