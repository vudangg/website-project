import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    // 1. Kết nối DB trước tiên
    await connectDB();

    // 2. Lấy data từ Form
    const body = await req.json();
    const { name, email, password } = body;

    // 3. Kiểm tra rỗng
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Vui lòng nhập đủ thông tin!" }, { status: 400 });
    }

    // 4. Kiểm tra xem Email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email này đã được đăng ký!" }, { status: 400 });
    }

    // 5. Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Lưu vào DB
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });

  } catch (error) {
    // Log lỗi ra màn hình Terminal để bắt bệnh
    console.error("LỖI API ĐĂNG KÝ:", error);
    return NextResponse.json({ message: "Có lỗi xảy ra từ máy chủ." }, { status: 500 });
  }
}