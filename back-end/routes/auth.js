const express = require("express");
const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post("/signup",
  [
    body("name", "Name not valid").isLength({ min: 3 }),
    body("email", "Email not valid").isEmail(),
    body("password", "Password must be atleast 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send("User with this email already exists.");
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: [{
          id: user.id,
        }],
      };

      const authToken = jwt.sign(data, user.date);
      res.send({ Token: authToken });
    } catch (err) {
      res.status(500).send("Internal server error.");
    }
  }
);

router.post("/login",
  [
    body("email", "Email not valid").isEmail(),
    body("password", "Password must be atleast 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please try to log in with correct credentials." });
      }

      const passAnalyse = await bcrypt.compare(password, user.password);
      if (!passAnalyse) {
        return res.status(400).send({ error: "Please try to log in with correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, "YouWillNeverFindThis");
      res.json({ Token: authToken });
    } catch (error) {
      res.status(500).send("Internal server error.", error.message);
    }
  }
);

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Internal server error.", error.message);
  }
});

module.exports = router;
