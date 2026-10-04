import Link from "next/link";
import { LayoutDashboard, Package, Users, ShoppingCart, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* 1. SIDEBAR (Menu bên trái) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-slate-800">
          <h1 className="text-2xl font-bold text-blue-500">Vũ Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <LayoutDashboard size={20} /> Tổng quan
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <Package size={20} /> Sản phẩm
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <ShoppingCart size={20} /> Đơn hàng
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <Users size={20} /> Khách hàng
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 p-3 w-full rounded hover:bg-red-900/30 text-red-400 transition">
            <LogOut size={20} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT (Nội dung chính bên phải) */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}