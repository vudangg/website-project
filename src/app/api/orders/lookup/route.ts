import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();
    
    // Lấy số điện thoại từ đường dẫn URL (vd: /api/orders/lookup?phone=0901234567)
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json({ message: "Vui lòng cung cấp số điện thoại!" }, { status: 400 });
    }

    // Tìm tất cả đơn hàng có số điện thoại này, sắp xếp đơn mới nhất lên đầu
    const orders = await Order.find({ phone }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy đơn hàng nào với số điện thoại này." }, { status: 404 });
    }

    return NextResponse.json({ orders }, { status: 200 });

  } catch (error) {
    console.error("LỖI TRA CỨU ĐƠN HÀNG:", error);
    return NextResponse.json({ message: "Có lỗi xảy ra từ máy chủ." }, { status: 500 });
  }
}