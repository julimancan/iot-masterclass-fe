const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypct = require("bcrypt");


// POST = req.body
// GET = req.query

// import models
import User from "../models/user";

// AUTH



//  register a new user to db 
router.post("/register", async (req, res) => {

  const password = req.body.password;
  const encryptedPassword = bcrypct.hashSync(password, 10);

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
  };


  try {

    const user = await User.create(newUser);
    res.json({ "status": "success" });
    console.log(`user`, user);
    const dataToSend = {
      status: "success",
      data: user
    }
    res.json(dataToSend);

  } catch (error) {

    const failedStatus = {
      status: "error",
      message: "user already exists!"
    }
    console.log(`error user already exists`, error);
    res.status(500).json(failedStatus);
  }
});


// login a registered user 
router.post("/login", async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;


  const user = await User.findOne({ email });

  console.log(`user`, user);

  if (!user) {
    console.log("user doesnt exist")
    const failedStatus = {
      status: "error",
      error: "invalid credentials"
    }
    return res.status(401).json(failedStatus);
  }
  // check password
  if (bcrypct.compareSync(password, user.password)) {

    user.set("password", undefined, { strict: false })

    const token = jwt.sign({
      userData: user
    }, "securePasswordHere",
      {
        // change the last number to change the amount of days a web token is valid for
        expiresIn: 60 * 60 * 24 * 30
      }
    );

    const response = {
      status: "success",
      message: "user authorized",
      token,
      userData: user
    };

    return res.status(200).json(response);

  } else {
    const response = {
      status: "error",
      message: "invalid credentials"
    }

    return res.status(401).json(response);

  }
});


module.exports = router;