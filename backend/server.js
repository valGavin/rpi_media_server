const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const media = require("./routes/api/media");

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Databases
const db = require("./config/keys").mongoURI;  // Config
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

// Passport middleware and config
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/media", media);

const port = process.env.PORT || 5000;  // process.env.port is for Heroku deployment

app.listen(port, () => console.log(`Server is up and running on port: ${port}`));
