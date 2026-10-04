import Link from "next/link";
import { Facebook, Youtube, Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        {/* Lưới chia cột thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Cột 1: Giới thiệu */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Vũ Store</h2>
            <p className="text-sm leading-relaxed mb-4">
              Hệ thống bán lẻ PC Gaming, Laptop và Gear cao cấp hàng đầu. 
              Cam kết chính hãng, bảo hành siêu tốc 1 đổi 1.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-blue-500 transition"><Facebook size={20}/></Link>
              <Link href="#" className="hover:text-red-500 transition"><Youtube size={20}/></Link>
              <Link href="#" className="hover:text-pink-500 transition"><Instagram size={20}/></Link>
            </div>
          </div>

          {/* Cột 2: Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400">Hướng dẫn mua hàng</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Chính sách bảo hành</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Phương thức thanh toán</Link></li>
            </ul>
          </div>

          {/* Cột 3: Sản phẩm chính */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm">Danh mục sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400">PC Gaming giá rẻ</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Laptop văn phòng</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Linh kiện máy tính</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Màn hình đồ họa</Link></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-0.5" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <span>1800.6868 (Miễn phí)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>cskh@vustore.vn</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Dòng bản quyền cuối cùng */}
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© 2026 Vũ Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}