"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Phone, CreditCard, Banknote, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedCart.length === 0 && !orderSuccess) {
      router.push("/cart"); // Nếu giỏ hàng trống thì đá về trang giỏ hàng
    }
    setCart(savedCart);

    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (savedUser?.name) {
      setCustomerName(savedUser.name);
    }
  }, [router, orderSuccess]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  const handleCheckout = async () => {
    setErrorMsg("");
    if (!customerName || !phone || !address) {
      setErrorMsg("Vui lòng nhập đầy đủ Tên, SĐT và Địa chỉ giao hàng!");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          paymentMethod,
          items: cart,
          totalAmount: totalAmount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("cart");
        setCart([]);
        window.dispatchEvent(new Event("storage"));
        setOrderSuccess(true);
      } else {
        setErrorMsg(data.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      setErrorMsg("Lỗi kết nối máy chủ. Hãy thử lại!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white px-4">
        <CheckCircle2 size={80} className="text-green-500 mb-4 animate-bounce" />
        <h1 className="text-3xl font-black mb-2">Đặt hàng thành công!</h1>
        <p className="text-slate-400 mb-6 text-center max-w-md">
          {paymentMethod === "transfer" 
            ? "Đơn hàng của bạn đã được ghi nhận. Vui lòng chuyển khoản để hoàn tất." 
            : "Đơn hàng của bạn sẽ được thanh toán khi nhận hàng (COD)."}
        </p>
        <div className="flex gap-4">
          <Link href="/order-lookup" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition">
            Tra cứu đơn hàng
          </Link>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold transition">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Nút quay lại */}
        <div className="mb-6">
          <Link href="/cart" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 w-fit">
            &larr; Quay lại Giỏ hàng
          </Link>
        </div>

        <h1 className="text-3xl font-black mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
          Thanh toán đơn hàng
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cột trái: Form thông tin (Giao diện cũ của bạn) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                <MapPin className="text-blue-500" /> Thông tin nhận hàng
              </h2>
              
              {errorMsg && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm">{errorMsg}</div>}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-400">Họ và tên</label>
                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Nhập tên người nhận" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-400">Số điện thoại</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-3 text-slate-500" />
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xxxxxxx" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-400">Địa chỉ giao hàng chi tiết</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, đường, phường/xã, quận/huyện..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                <CreditCard className="text-blue-500" /> Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600" />
                  <Banknote size={24} className={paymentMethod === 'cod' ? 'text-blue-400' : 'text-slate-400'} />
                  <div>
                    <h3 className="font-bold">Thanh toán khi nhận hàng (COD)</h3>
                    <p className="text-sm text-slate-400">Thanh toán bằng tiền mặt khi shipper giao hàng tới.</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${paymentMethod === 'transfer' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
                  <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600" />
                  <CreditCard size={24} className={paymentMethod === 'transfer' ? 'text-blue-400' : 'text-slate-400'} />
                  <div>
                    <h3 className="font-bold">Chuyển khoản ngân hàng</h3>
                    <p className="text-sm text-slate-400">Vũ Store sẽ gọi điện xác nhận và hướng dẫn chuyển khoản.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Cột phải: Tóm tắt đơn hàng chốt */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold border-b border-slate-800 pb-3 mb-4">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-slate-800" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-white line-clamp-2">{item.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-slate-400 text-sm">SL: {item.quantity}</p>
                        <p className="text-blue-400 font-bold text-sm">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-400 font-medium">Miễn phí</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between text-lg font-black text-white">
                  <span>Tổng cộng</span>
                  <span className="text-blue-400">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30 mt-6"
              >
                {isProcessing ? "Đang xử lý..." : "Xác nhận Đặt hàng"} <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}