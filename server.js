const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { strict } = require("assert");
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({helpers});

hbs.handlebars.registerHelper('switch', function(value, options) {
  this.switch_value = value;
  this.switch_break = false;
  return options.fn(this);
});

hbs.handlebars.registerHelper('case', function(value, options) {
  this.case_value = value;
  if (this.case_value === this.switch_value) {
    this.switch_break = true;
    return options.fn(this);
  }
});

hbs.handlebars.registerHelper("consolelog", function() {
  console.log(this.switch_value);
  console.log(this.case_value);
});

require("dotenv").config();

const sess = {
  secret: process.env.SESSION_KEY,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Now listening. View at http://localhost:3001")
  ); // add heroku link once generated.
});
