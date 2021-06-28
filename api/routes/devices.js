const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/authentication");

const colors = require("colors");


// Models
import Device from "../models/device";



// APIs

// get DEVICES
router.get("/device", checkAuth, async (req, res) => {
  try {

    const userId = req.userData._id;

    const devices = await Device.find({ userId })


    const response = {
      status: "success",
      data: devices,
    };

    return res.status(200).json(response);

  } catch (error) {
    const response = {
      status: "error",
      error
    };
    console.log(`error getting devices`, error);

    return res.status(500).json(response);
  }
})



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
router.delete("/device", checkAuth, async (req, res) => {

  try {
    const userId = req.userData._id;
    const dId = req.query.dId;


    const result = await Device.deleteOne({ userId, dId });

    const response = {
      status: "success",
      data: result
    };

    return res.json(response);

  } catch (error) {

    console.log("ERROR DELETING DEVICE");
    console.log(error);

    const response = {
      status: "error",
      error: error
    };

    return res.status(500).json(response);
  }
});


router.put("/device", checkAuth, (req, res) => {


  const dId = req.body.dId;
  const userId = req.userData._id;

  if (selectDevice(userId, dId)) {
    const response = {
      status: "success",
    };
    return res.json(response);
  } else {
    const response = {
      status: "error",
    };
    return res.status(500).json(response);
  }

});


// FUNCTIONS
const selectDevice = async (userId, dId) => {
  try {
    const result = await Device.updateMany({ userId }, { selected: false });
    const result2 = await Device.updateOne({ dId, userId });

    return true;
  } catch (error) {
    console.log(`error in function selectDevice`, error);
    return false;
  }

}




module.exports = router;
