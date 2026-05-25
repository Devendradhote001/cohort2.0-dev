const { default: mongoose } = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/test-artokens");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in connecting db", error);
  }
};

module.exports = connectDB;
