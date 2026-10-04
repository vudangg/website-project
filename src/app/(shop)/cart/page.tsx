"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
          <ShoppingBag className="text-blue-500" /> Giỏ hàng của bạn
        </h1>

        {cart.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
            <p className="text-slate-400 text-lg mb-6">Giỏ hàng của bạn đang trống.</p>
            <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition">
              Quay lại mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cột trái: Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-slate-800" />
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-white line-clamp-2">{item.name}</h3>
                    <p className="text-blue-400 font-bold mt-2">{formatPrice(item.price)}</p>
                  </div>

                  {/* Nút cộng trừ */}
                  <div className="flex items-center gap-3 bg-slate-800 rounded-lg px-2 py-1.5 border border-slate-700">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 text-slate-400 hover:text-white font-bold text-lg">-</button>
                    <span className="text-base font-semibold w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 text-slate-400 hover:text-white font-bold text-lg">+</button>
                  </div>

                  <button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-red-500 p-3 transition bg-slate-800/50 rounded-lg ml-2" title="Xóa">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cột phải: Bảng tính tiền sơ bộ */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-5 sticky top-24">
              <h2 className="text-xl font-bold border-b border-slate-800 pb-3">Tổng quan giỏ hàng</h2>
              
              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Tạm tính ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between text-lg font-bold text-white">
                  <span>Tổng tiền</span>
                  <span className="text-xl text-blue-400">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Nhấn nút này sẽ chuyển sang trang Thanh toán */}
              <Link href="/checkout" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30">
                Tiến hành thanh toán <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}