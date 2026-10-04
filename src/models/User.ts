import mongoose from "mongoose";

// Định nghĩa cấu trúc 1 User
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // Mặc định là khách hàng (user)
  },
  { timestamps: true } // Tự động lưu ngày tạo
);

// Nếu Model đã tồn tại thì dùng lại, chưa có thì tạo mới
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;