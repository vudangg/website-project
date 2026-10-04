import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen text-white">
      
      {/* 1. HERO SECTION (Banner chính) */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-20 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Nội dung bên trái */}
          <div className="md:w-1/2 space-y-6 z-10">
            <div className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-500/30">
              🎉 Khuyến mãi chào hè 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Build PC Gaming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Đỉnh Cao Hiệu Năng
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg">
              Sở hữu ngay dàn máy cấu hình khủng, chiến mượt mọi tựa game AAA. 
              Bảo hành chính hãng 36 tháng, hỗ trợ trả góp 0%.
            </p>
            
            <div className="flex gap-4">
              <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition transform hover:scale-105">
                Xem cấu hình <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-bold border border-slate-700 transition">
                Tư vấn ngay
              </Link>
            </div>
            
            {/* Cam kết nhỏ */}
            <div className="pt-4 flex gap-6 text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-500" /> 100% Chính hãng
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" /> Lắp đặt siêu tốc
              </div>
            </div>
          </div>

          {/* Ảnh bên phải (Dùng ảnh minh họa từ Unsplash) */}
          <div className="md:w-1/2 relative z-10">
            {/* Hiệu ứng bóng sáng sau ảnh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop" 
              alt="Gaming PC" 
              className="w-full rounded-2xl shadow-2xl border border-slate-700 hover:scale-[1.02] transition duration-500"
            />
          </div>

        </div>
      </section>

      {/* 2. SECTION KHÁC (Để tạm đây cho đỡ trống) */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center uppercase tracking-wide">
          Tại sao chọn Vũ Store?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Truck size={40} className="text-blue-500"/>, title: "Giao hàng toàn quốc", desc: "Miễn phí vận chuyển cho đơn hàng > 20 triệu" },
            { icon: <ShieldCheck size={40} className="text-blue-500"/>, title: "Bảo hành 1 đổi 1", desc: "Lỗi là đổi mới trong 30 ngày đầu tiên" },
            { icon: <Zap size={40} className="text-blue-500"/>, title: "Hỗ trợ kỹ thuật 24/7", desc: "Đội ngũ kỹ thuật viên giàu kinh nghiệm" },
          ].map((item, index) => (
            <div key={index} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition group">
              <div className="mb-4 bg-slate-800 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-blue-900/30 transition">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}