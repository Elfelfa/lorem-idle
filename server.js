const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize');
const { strict } = require('assert');
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
require('dotenv').config();

const sess = {
    secret: process.env.SESSION_KEY,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: strict
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(sessoin(sess));

app.engine('handlebars', hbs.engine);
app.set('view engin', 'handlebars'); // can change this second string to hbs for propper handlebars naming. Will have to rename files though.

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening. View at http://localhost:3001')); // add heroku link once generated.
});
