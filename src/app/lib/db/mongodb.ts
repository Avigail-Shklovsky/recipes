import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "";

// connecting to database- mongoDB.
let isConnected = false;

const connect = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connection.readyState === 1;
    console.log("mongodb connection seccseefull");
  } catch (error) {
    throw new Error("error in connection to mongodb " + error);
  }
};

export default connect;
