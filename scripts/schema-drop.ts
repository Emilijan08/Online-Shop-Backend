import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function dropDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    await mongoose.connection.dropDatabase();
    console.log("Database dropped successfully");
  } catch (error) {
    console.error("Error dropping database:", error);
  } finally {
    mongoose.connection.close();
  }
}

dropDatabase();
