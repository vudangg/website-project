"use client";

import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Gọi đến ống API Login vừa tạo
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message); // Báo lỗi sai mật khẩu
      } else {
        setSuccess("Đăng nhập thành công! Đang vào hệ thống...");
        
        // Cất thông tin người dùng vào bộ nhớ trình duyệt (để lát nữa in tên lên Navbar)
        localStorage.setItem("user", JSON.stringify(data.user));

        // Chờ 1.5 giây rồi chuyển trang
        setTimeout(() => {
          if (data.user.role === "admin") {
            router.push("/admin"); // Sếp thì vào Admin
          } else {
            router.push("/"); // Khách thì ra Trang chủ
          }
        }, 1500);
      }
    } catch (err) {
      setError("Có lỗi kết nối, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Đăng nhập</h1>
          <p className="text-slate-400">Chào mừng bạn quay trở lại Vũ Store</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-lg mb-4 text-sm text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          
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

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? "Đang kiểm tra..." : "Đăng nhập"} <ArrowRight size={20} />
          </button>

        </form>

        <div className="mt-8 text-center text-slate-400 text-sm">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-400 font-bold hover:underline">
            Đăng ký ngay
          </Link>
        </div>

      </div>
    </div>
  );
}