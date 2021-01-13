//jshint esversion:6
require('dotenv').config(); // Configure process.env as soon as possible
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
/* const ejs = */ require("ejs");
const log = require(__dirname + '/log.js');
const db = require(__dirname + '/database/database.js');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')

// port number for Heroku
const port = process.env.PORT;

// Using ejs template engine
app.set('view engine', 'ejs');
// Using body_parser
app.use(bodyParser.urlencoded({extended: true}));
// Using public folder
app.use(express.static("public"));
// Using cookies for flash
app.use(cookieParser(process.env.APP_COOKIE_SECRET));
// Use sessions for passport, and cookies for flash
app.use(session({
  secret: process.env.APP_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

db.passportConfig(passport);

// set routes
require('./router/public.js')(app);
require('./router/login.js')(app);
require('./router/private.js')(app);

app.listen(port, () => log('Server listening at http://localhost:'+port));
