import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://sharonkumarpala:sharon1234@cluster0.czoxg.mongodb.net/chai`);
    } catch (error) {
      process.exit(1);
    }
  }
  export default connectDB;
