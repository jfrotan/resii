const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");
const cors = require("cors");
var session = require("express-session"); // not express-sessions !
var MongoStore = require("connect-mongo")(session);

const app = express();

//connect to MongoDB
mongoose.connect(
  "mongodb://admin:admin@ds239648.mlab.com:39648/application-tracker"
);
var db = mongoose.connection;

//handle mongo error
db.on("error", console.error.bind(console, "connection error:"));

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("./routes")(app);

app.listen(config.port);
console.log(`Server started on port ${config.port}`);
