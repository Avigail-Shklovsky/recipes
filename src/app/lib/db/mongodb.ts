import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "";

// connecting to database- mongoDB.

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("mongodb connection seccseefull");
  } catch (error) {
    throw new Error("error in connection to mongodb " + error);
  }
};

export default connect;
