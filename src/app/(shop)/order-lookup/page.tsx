"use client";

import { useState } from "react";
import { Search, Package, Calendar, MapPin, Phone, CreditCard, Clock } from "lucide-react";

export default function OrderLookupPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại!");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const res = await fetch(`/api/orders/lookup?phone=${phone}`);
      const data = await res.json();

      if (res.ok) {
        setOrders(data.orders);
      } else {
        setOrders([]);
        setError(data.message);
      }
    } catch (err) {
      setOrders([]);
      setError("Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">Thành công</span>;
      case "pending":
        return <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30">Đang xử lý</span>;
      case "cancelled":
        return <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30">Đã hủy</span>;
      default:
        return <span className="bg-slate-500/20 text-slate-400 px-3 py-1 rounded-full text-xs font-bold border border-slate-500/30">{status}</span>;
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-950 text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Phần Tìm kiếm */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 text-center shadow-xl">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2">Tra cứu đơn hàng</h1>
          <p className="text-slate-400 mb-6">Nhập số điện thoại bạn đã dùng để đặt hàng để kiểm tra tình trạng đơn</p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ví dụ: 0912345678" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none pr-32"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold px-6 rounded-lg transition flex items-center gap-2"
            >
              {loading ? <Clock className="animate-spin" size={18} /> : <Search size={18} />}
              Tìm
            </button>
          </form>
          {error && <p className="text-red-400 mt-4 font-medium bg-red-500/10 inline-block px-4 py-2 rounded-lg border border-red-500/20">{error}</p>}
        </div>

        {/* Phần Kết quả */}
        {hasSearched && !loading && orders.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">{orders.length}</span>
              đơn hàng được tìm thấy
            </h2>

            {orders.map((order) => (
              <div key={order._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition">
                {/* Header đơn hàng */}
                <div className="bg-slate-800/50 p-5 border-b border-slate-800 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5"><Calendar size={14}/> Ngày đặt: {formatDate(order.createdAt)}</p>
                    <p className="text-sm font-medium">Mã đơn: <span className="text-blue-400 font-mono uppercase">{order._id.slice(-8)}</span></p>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="p-5 space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-slate-800 border border-slate-700" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-white line-clamp-2">{item.name}</h3>
                        <div className="flex justify-between mt-1 text-sm">
                          <p className="text-slate-400">Số lượng: {item.quantity}</p>
                          <p className="text-slate-300 font-medium">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer đơn hàng (Tổng tiền & Giao hàng) */}
                <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-2 text-sm text-slate-400 flex-1">
                    <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-slate-500 shrink-0"/> {order.customerName} - {order.address}</p>
                    <p className="flex items-center gap-2"><CreditCard size={16} className="text-slate-500 shrink-0"/> {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-slate-400 mb-1">Tổng thành tiền</p>
                    <p className="text-2xl font-black text-blue-400">{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}