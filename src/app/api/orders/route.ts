import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { customerName, phone, address, paymentMethod, items, totalAmount } = body;

    // Kiểm tra giỏ hàng
    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Giỏ hàng rỗng!" }, { status: 400 });
    }

    // Kiểm tra xem khách đã nhập đủ thông tin chưa
    if (!customerName || !phone || !address || !paymentMethod) {
      return NextResponse.json({ message: "Vui lòng nhập đầy đủ thông tin giao hàng!" }, { status: 400 });
    }

    // Lưu vào Database
    const newOrder = new Order({
      customerName,
      phone,
      address,
      paymentMethod,
      items,
      totalAmount,
      status: "completed",
    });

    await newOrder.save();

    return NextResponse.json({ message: "Đặt hàng thành công!" }, { status: 201 });

  } catch (error) {
    console.error("LỖI ĐẶT HÀNG:", error);
    return NextResponse.json({ message: "Có lỗi xảy ra từ máy chủ." }, { status: 500 });
  }
}