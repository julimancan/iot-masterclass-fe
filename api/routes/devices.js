const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/authentication");

const colors = require("colors");


// Models
import Device from "../models/device";



// APIs

//  get a device
router.get("/device", checkAuth, (req, res) => {
  console.log(`req.userData`, req.userData);

  req.userData.userId;

  const response = {
    status: "success",
    data: "[1, 2, 3]",
    message: "woohoo",
  };

  return res.status(200).json(response);
});



// {
//   "newDevice": {
//     "dId": { "ASLDKJASD" },
//     "name": { "DEVICE NAME" },
//     "templateName": { "TEMPLATE NAME" },
//     "templateId": { "ASLDKJASD" }
//   }
// }

// input a new device to db
router.post("/device", checkAuth, async (req, res) => {
  try {
    let newDevice = req.body.newDevice;
    newDevice.userId = req.userData._id;
    newDevice.createdTime = Date.now();
    console.log(`newDevice`.yellow, newDevice);

    const device = await Device.create(newDevice);

    const response = {
      status: "success",
    };
    return res.json(response);
  } catch (error) {
    console.log(`ERROR CREATING NEW DEVICE`.red, error)
    const response = {
      status: "error",
      error
    };
    return res.status(500).json(response);
  }
});

// delete a device from the db
router.delete("/delete-device", (req, res) => {
  res.send("hello from api/devices")
});



router.put("/update-device", (req, res) => {
  res.send("hello from api/devices")
});

module.exports = router;

// FUNCTIONS