const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/user");
require("./services/passport");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfully connected to Mongo database");
    }
  }
);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(err) {
  if (err) {
    console.log("There was an error connecting to the port");
  } else {
    console.log("Successfully listening on Port " + PORT);
  }
});
