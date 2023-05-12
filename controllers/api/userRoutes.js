const router = require("express").Router();
const dayjs = require('dayjs');
const { User, Active_Resource, Progress, Inventory, Resource, Experience } = require("../../models");

// Gather all user data of the client making the request
router.get("/myData", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.session.user_id.toString() },
      attributes: { exclude: ['id', 'email', 'password'] },
      include: [{ model: Resource, through: { Active_Resource }, as: 'active_resource' },
      { model: Progress, attributes: { exclude: ['id', 'user_id'] }, as: 'progresses' },
      { model: Inventory, attributes: { exclude: ['id', 'user_id'] }, as: 'inventories' }]
    });

    if (userData) {
      res.status(200).json(userData);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to grab user data. Error: " + err });
  };
});

router.put("/loginUpdate", async (req, res) => {
  try {
    try {
      const userData = await User.update(
        {
          timestamp: dayjs().format('YYYY/MM/DD/hh/mm/ss')
        },
        {
          where: { id: req.session.user_id }
        }
      );
    } catch (err) {
      console.log(err);
    }

    const progressDataWC = await Progress.update(
      {
        level: req.body.player.woodcuttingLevel,
        experience: req.body.player.woodcuttingEXP
      },
      {
        where: { user_id: req.session.user_id, skill_id: 1 }
      }
    );


    console.log(req.body.player.fishingLevel);
    console.log(req.body.player.woodcuttingLevel);
    console.log(req.body.player.fishingEXP);
    console.log(req.body.player.woodcuttingEXP);


    const progressDataFSH = await Progress.update(
      {
        level: req.body.player.fishingLevel,
        experience: req.body.player.fishingEXP
      },
      {
        where: { user_id: req.session.user_id, skill_id: 2 }
      }
    );

    let invArray = []

    for (let i = 0; i < 18; i++) {
      invArray.push({ amount: req.body.player.inventory[i], itemId: (i + 1) });
    };
    try {
      const inventoryData = await Promise.all(
        invArray.map((item, index) => {
          return Inventory.update(
            { item_amount: item.amount },
            { where: { user_id: req.session.user_id, item_id: item.itemId } }
          );
        })
      );
    } catch (err) {
      console.log(err);
    }

    res.status(200).json();
  } catch (err) {
    res.status(500).json({ message: "Unable to update user data. Error: " + err });
  };
});

router.get("/expChart", async (req, res) => {
  try {
    const expData = await Experience.findAll({ attributes: { exclude: ["id"] } });

    const expChart = expData.map((data) => data.get({ plain: true }));

    let chartArray = [];
    for (let i = 0; i < expChart.length; i++) {
      chartArray.push(expChart[i].exp);

    }
    // console.log(expChart);

    if (chartArray) {
      res.status(200).json(chartArray);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to grab user data. Error: " + err });
  };
});

// Gather all user data of a specified user
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.params.id }
    });

    if (userData) {
      res.status(200).json(userData);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to grab user data. Error: " + err });
  };
});

// Create a new User using a POST
router.post("/createuser", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    if (userData) {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });
    }
  } catch (err) {
    res
      .status(500)
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

    if (req.session) {
      req.session.regenerate(() => {
        (req.session.user_id = userData.id),
          (req.session.logged_in = true),
          res.json({ message: "Successfully logged in" });
      })
    } else {
      req.session.save(() => {
        (req.session.user_id = userData.id),
          (req.session.logged_in = true),
          res.json({ message: "Successfully logged in" });
      });
    }


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
