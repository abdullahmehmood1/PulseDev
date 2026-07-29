import mongoose from "mongoose";

export let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pulsedev";

  try {
    // Attempt fast connection with 3s timeout
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    isConnected = true;
    console.log("✅ MongoDB connected successfully:", mongoose.connection.host);
  } catch (err) {
    isConnected = false;
    console.warn("⚠️ MongoDB local server unavailable (Reason: " + err.message + "). Operating with high-availability in-memory fallback layer.");
  }
}

