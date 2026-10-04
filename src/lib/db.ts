import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Chưa có MONGODB_URI trong file .env");
}

// Hàm kết nối Database
export const connectDB = async () => {
  try {
    // Nếu đã kết nối rồi thì thôi, không kết nối lại
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    // Bắt đầu kết nối
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
  }
};