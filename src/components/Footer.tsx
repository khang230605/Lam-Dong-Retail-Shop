import Link from 'next/link';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Cột 1: Thông tin công ty */}
        <div>
          <h2 className="text-2xl font-bold mb-6">LAM DONG <span className="text-brand-orange">RETAIL</span></h2>
          <p className="text-blue-100 text-sm mb-6 leading-relaxed">
            Cửa hàng tạp hóa hiện đại, cung cấp thực phẩm sạch và các gói sản phẩm thông minh giúp bạn tiết kiệm chi phí sinh hoạt hàng ngày.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-orange cursor-pointer transition">
                <Facebook className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-orange cursor-pointer transition">
                <Instagram className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-orange cursor-pointer transition">
                <Youtube className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Cột 2: Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-6 relative inline-block">
            Về chúng tôi
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-orange rounded"></span>
          </h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link href="/about" className="hover:text-brand-orange transition">Giới thiệu</Link></li>
            <li><Link href="/delivery" className="hover:text-brand-orange transition">Thông tin giao hàng</Link></li>
            <li><Link href="/policy" className="hover:text-brand-orange transition">Chính sách bảo mật</Link></li>
            <li><Link href="/terms" className="hover:text-brand-orange transition">Điều khoản sử dụng</Link></li>
          </ul>
        </div>

        {/* Cột 3: Tài khoản */}
        <div>
          <h3 className="font-bold text-lg mb-6 relative inline-block">
            Tài khoản
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-orange rounded"></span>
          </h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link href="/dangnhap" className="hover:text-brand-orange transition">Đăng nhập</Link></li>
            <li><Link href="/giohang" className="hover:text-brand-orange transition">Giỏ hàng</Link></li>
            <li><Link href="/wishlist" className="hover:text-brand-orange transition">Danh sách yêu thích</Link></li>
            <li><Link href="/track" className="hover:text-brand-orange transition">Theo dõi đơn hàng</Link></li>
          </ul>
        </div>
        
        {/* Cột 4: Liên hệ */}
        <div>
           <h3 className="font-bold text-lg mb-6 relative inline-block">
            Liên hệ
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-orange rounded"></span>
          </h3>
           <ul className="space-y-4 text-sm text-blue-100">
             <li className="flex items-start gap-3">
               <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0" />
               <span>123 Đường Hùng Vương, Phường 9, TP. Đà Lạt, Lâm Đồng</span>
             </li>
             <li className="flex items-center gap-3">
               <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
               <span>0912 345 678</span>
             </li>
             <li className="flex items-center gap-3">
               <Mail className="w-5 h-5 text-brand-orange flex-shrink-0" />
               <span>support@lamdongretail.com</span>
             </li>
           </ul>
        </div>
      </div>
      
      <div className="border-t border-blue-800 pt-8 text-center text-xs text-blue-300">
        &copy; 2026 Lam Dong Retail Store. Thiết kế bởi Hyen.
      </div>
    </footer>
  );
}