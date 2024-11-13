import mongoose from 'mongoose'
const MONGODB_URI = process.env.MONGODB_URI || "";

const connect = async () => {
  try {
    console.log(MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI);
    console.log("mongodb connection seccseefull");
  } catch (error) {
    throw new Error("error in connection to mongodb " + error);
  }
};

export default connect;
