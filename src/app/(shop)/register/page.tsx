"use client"; // Bắt buộc phải có dòng này để dùng form trên Next.js

import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  // Các biến lưu trữ chữ người dùng gõ vào
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Các biến thông báo
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hàm chạy khi bấm nút Đăng ký
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Chặn việc web bị tải lại
    setError("");
    setSuccess("");

    // 1. Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    setIsLoading(true);

    try {
      // 👉 ĐÃ SỬA ĐOẠN FETCH Ở ĐÂY: Thêm http://localhost:3000
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Nếu API báo lỗi (trùng email, thiếu thông tin...)
        setError(data.message);
      } else {
        // Nếu thành công
        setSuccess("Đăng ký thành công! Đang chuyển hướng...");
        // Chờ 2 giây rồi tự động nhảy sang trang Login
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Lỗi mạng:", err);
      setError("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tạo tài khoản mới</h1>
          <p className="text-slate-400">Trở thành thành viên của Vũ Store ngay hôm nay</p>
        </div>

        {/* Hiện thông báo lỗi hoặc thành công */}
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-lg mb-4 text-sm text-center">{success}</div>}

        {/* Form Đăng ký */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Tên hiển thị</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={20} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vũ Nguyễn" 
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vu@example.com" 
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Nhập lại mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký tài khoản"} <ArrowRight size={20} />
          </button>

        </form>

        <div className="mt-8 text-center text-slate-400 text-sm">
          Bạn đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-400 font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </div>

      </div>
    </div>
  );
}