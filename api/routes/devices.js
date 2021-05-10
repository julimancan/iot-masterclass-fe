const express = require("express");
const { checkAuth } = require("../middlewares/authentication");
const colors = require("colors");


const router = express.Router();


//  get a device
router.get("/device", checkAuth, (req, res) => {
  console.log("here".red)
  console.log(`req.userData`, req.userData);

  const response = {
    status: "success",
    data: "[1, 2, 3]",
    message: "woohoo",
  };

  return res.status(200).json(response);
});




// input a new device to db
router.post("/new-device", (req, res) => {
  const data = {
    status: "success",
    data: req.body
  };
  res.json(data);
});

// delete a device from the db
router.delete("/delete-device", (req, res) => {
  res.send("hello from api/devices")
});



router.put("/update-device", (req, res) => {
  res.send("hello from api/devices")
});

module.exports = router;

