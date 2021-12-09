const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to mongo successfully!!");
  });
};

module.exports = connectToMongo;