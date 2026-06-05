import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/tiny-cats");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in mongodb ", error);
  }
};
