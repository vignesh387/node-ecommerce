import mongoose from "mongoose";

const uri =
  "mongodb+srv://vignesh:M0ng0DBAtlaS@cluster0.oiwo173.mongodb.net/ecommerce";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("db connected");
  } catch (error) {
    console.log("db connection error", error);
  }
};
