"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import Link from "next/link";

// Next.js truyền URL params vào đây
export default function DynamicCategoryPage({ params }: { params: { type: string, brand: string } }) {
  const [added, setAdded] = useState(false);
  
  // Lấy tên hãng và danh mục từ URL, viết hoa lên cho đẹp
  const brandName = params.brand ? params.brand.toUpperCase() : "HÃNG";
  const typeName = params.type ? params.type.toUpperCase() : "DANH MỤC";

  // Tạo MỘT sản phẩm ảo tự động đổi tên theo Hãng đang xem
  const product = {
    id: `${params.brand}-gaming-01`,
    name: `${typeName} Gaming ${brandName} Phiên Bản Cao Cấp 2026`,
    brand: brandName,
    price: 32990000,
    oldPrice: 35990000,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
    specs: ["Core i7 / Ryzen 7", "RTX 4060 8GB", "16GB RAM", "1TB SSD Gen4", "Màn hình 2K 165Hz"],
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Kích hoạt sự kiện để cái Logo Giỏ hàng trên Navbar nhảy số ngay lập tức
    window.dispatchEvent(new Event("storage")); 
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Breadcrumb tự động */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 uppercase">
          <Link href="/" className="hover:text-white">Trang chủ</Link>
          <span>/</span>
          <span>{typeName}</span>
          <span>/</span>
          <span className="text-blue-500 font-semibold">{brandName}</span>
        </div>

        <h1 className="text-3xl font-black mb-8 border-b border-slate-800 pb-4">
          Tất cả sản phẩm {brandName} chính hãng
        </h1>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition flex flex-col justify-between group">
            <div>
              {/* Ảnh */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-800 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  HOT
                </span>
              </div>

              {/* Tên tự động */}
              <h2 className="text-lg font-bold line-clamp-2 mb-2 text-white group-hover:text-blue-400 transition">
                {product.name}
              </h2>

              {/* Thông số ngắn */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.specs.map((spec, i) => (
                  <span key={i} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Giá */}
              <div className="mb-4">
                <p className="text-2xl font-black text-blue-400">{formatPrice(product.price)}</p>
                <p className="text-xs text-slate-500 line-through">{formatPrice(product.oldPrice)}</p>
              </div>
            </div>

            {/* Nút thao tác */}
            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                  added ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} /> Đã thêm
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Mua ngay
                  </>
                )}
              </button>

              <Link
                href="/cart"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-3 rounded-xl font-bold transition flex items-center justify-center"
                title="Xem giỏ hàng"
              >
                Xem giỏ
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}