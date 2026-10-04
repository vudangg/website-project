import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    // 1. Kiểm tra xem có nhập thiếu không
    if (!email || !password) {
      return NextResponse.json({ message: "Vui lòng nhập đủ thông tin!" }, { status: 400 });
    }

    // 2. Tìm khách hàng theo Email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng!" }, { status: 400 });
    }

    // 3. So sánh mật khẩu gõ vào với mật khẩu mã hóa trong kho
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng!" }, { status: 400 });
    }

    // 4. Thành công! Trả về thông tin user (Không trả về mật khẩu nhé)
    return NextResponse.json({ 
      message: "Đăng nhập thành công!",
      user: { name: user.name, email: user.email, role: user.role }
    }, { status: 200 });

  } catch (error) {
    console.error("LỖI ĐĂNG NHẬP:", error);
    return NextResponse.json({ message: "Có lỗi xảy ra từ máy chủ." }, { status: 500 });
  }
}