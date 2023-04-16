import mongoose from "mongoose";

//mongodb connection

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`mongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`error : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
