// import express
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");


// instances
const app = express();
const PORT = 3001;

// express config
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

// express routes
app.use("/api", require("./routes/devices"));
app.use("/api", require("./routes/users"));

module.exports = app;


// listener
app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`)
});


// Mongo Connection
const mongoUserName = "devuser" ;
const mongoPassword = "devpassword";
const mongoHost = "localhost";
const mongoPort = "27017";
const mongoDatabase = "iotgl";


const uri = `mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;

const options = {
  useNewParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  authSource: "admin"
};

try {


mongoose.connect(uri, options).then(() => {
    console.log("\n");
    console.log("************************".rainbow);
    console.log("Mongo Succesfully Connected".random);
    console.log("************************".rainbow);
    console.log("\n");
  }, (err) => {
    console.log("\n");
    console.log("************************".red);
    console.log("Mongo Connected Failed".red);
    console.log("************************".red);
    console.log("\n");
    console.log(`error:`, err);
  });
} catch (error) {
  console.log(`error connecting to mongo`.red, error)
};