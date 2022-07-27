const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

// Load the input validation
const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");

// Load the User model
const User = require("../../models/admin/User");

/**
 * @route POST api/users/register
 * @desc User registration
 * @access Public
 */
router.post("/register", (req, res) => {
  // Form and check the validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) return res.status(400).json({ email: "The e-mail is already exist" });
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash the password before saving into database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route POST api/users/login
 * @desc User login and return the JWT token upon completion
 * @access Public
 */
router.post("/login", (req, res) => {
  // Form and check the validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  // Find the user by e-mail and check the password
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ emailnotfound: "This e-mail is not registered" });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      }
      else return res.status(400).json({ passwordincorrect: "Password is incorrect"})
    });
  });
});

module.exports = router;