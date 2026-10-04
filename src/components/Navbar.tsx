"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  ClipboardList, 
  ChevronRight, 
  Laptop, 
  Monitor, 
  Gamepad2, 
  Cpu, 
  HardDrive 
} from "lucide-react";

// Dữ liệu danh mục ĐÃ ĐƯỢC GẮN LINK (href)
const categories = [
  {
    id: 1,
    name: "Laptop",
    icon: <Laptop size={20} />,
    subCategories: {
      brands: [
        { name: "ASUS", href: "/category/laptop/asus" },
        { name: "ACER", href: "/category/laptop/acer" },
        { name: "MSI", href: "/category/laptop/msi" },
        { name: "LENOVO", href: "/category/laptop/lenovo" },
        { name: "DELL", href: "/category/laptop/dell" },
        { name: "HP", href: "/category/laptop/hp" },
        { name: "LG", href: "/category/laptop/lg" },
      ],
      prices: ["Dưới 15 triệu", "Từ 15 - 20 triệu", "Trên 20 triệu"],
    },
  },
  { id: 2, name: "PC Gaming", icon: <Monitor size={20} />, subCategories: { brands: [{ name: "PC Gaming", href: "/category/pc/gaming" }, { name: "PC Văn phòng", href: "/category/pc/office" }] } },
  { id: 3, name: "Linh kiện PC", icon: <Cpu size={20} />, subCategories: { brands: [{ name: "Intel", href: "/category/components/intel" }, { name: "AMD", href: "/category/components/amd" }, { name: "NVIDIA", href: "/category/components/nvidia" }] } },
  { id: 4, name: "Màn hình", icon: <Monitor size={20} />, subCategories: { brands: [{ name: "Samsung", href: "/category/monitor/samsung" }, { name: "LG", href: "/category/monitor/lg" }, { name: "ViewSonic", href: "/category/monitor/viewsonic" }] } },
  { id: 5, name: "Gear", icon: <Gamepad2 size={20} />, subCategories: { brands: [{ name: "Logitech", href: "/category/gear/logitech" }, { name: "Razer", href: "/category/gear/razer" }, { name: "Corsair", href: "/category/gear/corsair" }] } },
  { id: 6, name: "Lưu trữ", icon: <HardDrive size={20} />, subCategories: { brands: [{ name: "SSD", href: "/category/storage/ssd" }, { name: "HDD", href: "/category/storage/hdd" }, { name: "Thẻ nhớ", href: "/category/storage/sd" }] } },
];

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  // Đếm số lượng sản phẩm trong giỏ
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum: number, item: { quantity: number }) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50"> 
      <div className="container mx-auto px-4 h-20 flex items-center gap-4">
        
        {/* LOGO */}
        <Link href="/" className="text-3xl font-bold text-blue-500 tracking-tighter shrink-0">
          Vũ Store
        </Link>

        {/* DANH MỤC */}
        <div className="group relative h-10 shrink-0">
          <button className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded text-sm font-bold hover:bg-slate-700 transition border border-slate-700">
            <Menu size={20} />
            <span>Danh mục</span>
          </button>

          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute top-full left-0 w-[250px] bg-slate-900 shadow-xl rounded-md border border-slate-700 pt-2 mt-2">
            <ul>
              {categories.map((cat) => (
                <li key={cat.id} className="group/item relative hover:bg-slate-800 p-3 flex items-center justify-between border-b border-slate-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">{cat.icon}</span>
                    <span className="font-medium text-sm">{cat.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500" />

                  {/* Bảng chi tiết */}
                  {cat.subCategories && (
                    <div className="invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100 transition-all absolute left-full top-0 w-[600px] min-h-[300px] bg-white text-slate-900 shadow-2xl border-l border-slate-200 p-6 grid grid-cols-3 gap-6 rounded-r-md z-50 ml-1 cursor-default">
                      <div>
                        <h3 className="font-bold text-blue-600 mb-3 text-sm border-b pb-1 uppercase">Thương hiệu</h3>
                        <ul className="space-y-2">
                          {cat.subCategories.brands?.map((brand) => (
                            <li key={brand.name}>
                              {/* ĐÃ BỌC THẺ LINK Ở ĐÂY ĐỂ CHUYỂN TRANG */}
                              <Link 
                                href={brand.href} 
                                className="text-sm hover:text-blue-600 block transition text-slate-600 font-medium cursor-pointer"
                              >
                                {brand.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {cat.subCategories.prices && (
                        <div>
                          <h3 className="font-bold text-blue-600 mb-3 text-sm border-b pb-1 uppercase">Mức giá</h3>
                          <ul className="space-y-2">
                            {cat.subCategories.prices.map((p) => (
                              <li key={p} className="text-sm hover:text-blue-600 cursor-pointer text-slate-600">{p}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TÌM KIẾM */}
        <div className="flex-1 relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Bạn cần tìm gì?" 
            className="w-full h-10 px-4 pr-10 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white">
            <Search size={18} />
          </button>
        </div>

        {/* MENU PHẢI */}
        <div className="flex items-center gap-6 text-xs font-medium text-slate-300 shrink-0">
          <Link href="/order-lookup" className="flex items-center gap-2 cursor-pointer hover:text-white group">
            <ClipboardList size={24} className="group-hover:text-blue-400 transition"/>
            <div className="hidden xl:block"><p>Tra cứu</p><p>đơn hàng</p></div>
          </Link>
          
          <Link href="/cart" className="flex items-center gap-2 cursor-pointer hover:text-white group">
            <div className="relative">
              <ShoppingCart size={24} className="group-hover:text-blue-400 transition"/>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden xl:block"><p>Giỏ</p><p>hàng</p></div>
          </Link>

          <div className="flex items-center gap-2 cursor-pointer hover:text-white group bg-slate-800 py-2 px-3 rounded hover:bg-slate-700 transition">
            <User size={20} className="group-hover:text-blue-400 transition"/>
            <div className="flex flex-col">
              <Link href="/login" className="hover:text-blue-400 font-bold">Đăng nhập</Link>
              <Link href="/register" className="hover:text-blue-400 font-normal text-[11px] text-slate-400">Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}