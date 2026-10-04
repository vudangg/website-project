import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { DollarSign, ShoppingBag, UserCheck } from "lucide-react";

// Tắt chế độ tạo trang tĩnh (Prerender) của Next.js cho trang này
export const dynamic = "force-dynamic";

// Hàm lấy dữ liệu thật từ Database
async function getDashboardData() {
  await connectDB();

  // 1. Đếm tổng số khách hàng
  const totalUsers = await User.countDocuments();

  // 2. Đếm tổng số đơn hàng
  const totalOrders = await Order.countDocuments();

  // 3. Tính tổng doanh thu
  const revenueResult = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);
  const totalRevenue = revenueResult[0]?.total || 0;

  return { totalUsers, totalOrders, totalRevenue };
}

export default async function AdminDashboard() {
  // Gọi hàm lấy số liệu
  const { totalUsers, totalOrders, totalRevenue } = await getDashboardData();

  // Định dạng tiền tệ (VND)
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Tổng quan kinh doanh</h2>

      {/* Các thẻ thống kê (Dữ liệu thật) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Thẻ Doanh thu */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400">Tổng doanh thu</h3>
            <DollarSign className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">{formatMoney(totalRevenue)}</p>
        </div>

        {/* Thẻ Đơn hàng */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400">Đơn hàng mới</h3>
            <ShoppingBag className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>

        {/* Thẻ Khách hàng */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400">Khách hàng</h3>
            <UserCheck className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-64 flex items-center justify-center text-slate-500">
        (Biểu đồ doanh thu - Đang cập nhật dữ liệu...)
      </div>
    </div>
  );
}