// scripts/renameVesToGram.js
/*import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";


dotenv.config();

const renameField = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URLI); // تأكد أن MONGO_URL موجود في .env
    const result = await foodModel.updateMany(
      { ves: { $exists: true } },
      { $rename: { ves: "gram" } }
    );
    console.log("apdated :", result.modifiedCount);
    process.exit();
  } catch (error) {
    console.error(" not apdeted:", error);
    process.exit(1);
  }
};

renameField();*/
