'use client';

import { useState, useEffect } from 'react';
import { BundleService } from '@/services/BundleService';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { X, ShoppingCart, Loader2 } from 'lucide-react';
import Image from 'next/image'; // Dùng Image của Next.js cho tối ưu

// 1. IMPORT ẢNH TỪ FOLDER BANNER CỦA BẠN
// Đảm bảo bạn đã có ảnh này trong folder: src/components/banner/popup-bg.png (hoặc tên gì đó tùy bạn)
import popupImage from './banner/banner3.png'; // Ví dụ mình lấy banner3 làm ảnh popup

// HÀM XỬ LÝ ẢNH BUNDLE (Nếu bạn lấy ảnh từ API Bundle thì dùng cái này)
// Nếu dùng ảnh cứng import ở trên thì không cần hàm này lắm, nhưng cứ để phòng hờ.
const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://placehold.co/600x600?text=No+Image";
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

export default function HomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [bundle, setBundle] = useState<any>(null);
  const { addBundleToCart } = useCart();

  useEffect(() => {
    const initPopup = async () => {
      // 1. Kiểm tra đã xem chưa (Bỏ comment dòng dưới nếu muốn test hiện liên tục)
      const hasSeen = sessionStorage.getItem('seen_home_popup');
      if (hasSeen) return; 

      // 2. LẤY BUNDLE CỤ THỂ MÀ BẠN MUỐN HIỆN
      // Thay 'bua-sang-dinh-duong' bằng slug của bundle bạn muốn quảng cáo
      const data = await BundleService.getBundleBySlug('com-nha-5-phut');
      
      if (data) {
        setBundle(data);
        
        // Hiện popup sau 2 giây
        setTimeout(() => {
            setIsVisible(true);
        }, 2000);
      }
    };

    initPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('seen_home_popup', 'true');
  };

  const handleAddToCart = () => {
    if (bundle) {
        addBundleToCart(bundle);
        alert(`Đã thêm "${bundle.name}" vào giỏ hàng!`);
        handleClose();
    }
  };

  if (!isVisible || !bundle) return null;

  const savings = bundle.original_price - bundle.price;
  const percent = Math.round((savings / bundle.original_price) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Lớp nền tối */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity duration-300 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Nội dung Popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-scale-up flex flex-col md:flex-row">
        
        {/* Nút đóng */}
        <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition text-gray-500 shadow-sm"
        >
            <X className="w-5 h-5" />
        </button>

        {/* CỘT TRÁI: THÔNG TIN (Giữ nguyên logic lấy từ Bundle thật) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-white">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-extrabold uppercase tracking-wider rounded mb-4 w-fit border border-red-200">
                🔥 Deal độc quyền hôm nay
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {bundle.name}
            </h2>
            
            <p className="text-gray-500 mb-6 line-clamp-3">
                {bundle.description}
            </p>

            <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-extrabold text-brand-orange">
                    {formatCurrency(bundle.price)}
                </span>
                <div className="flex flex-col mb-1">
                    <span className="text-sm text-gray-400 font-bold strike-through line-through">
                        {formatCurrency(bundle.original_price)}
                    </span>
                    <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                        Tiết kiệm {percent}%
                    </span>
                </div>
            </div>

            <button 
                onClick={handleAddToCart}
                className="bg-brand-orange text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2 w-full md:w-auto"
            >
                <ShoppingCart className="w-5 h-5" /> Thêm vào giỏ ngay
            </button>
        </div>

        {/* CỘT PHẢI: HÌNH ẢNH */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
            {/* 3. HIỂN THỊ ẢNH */}
            {/* Cách 1: Dùng ảnh Banner bạn đã import ở trên (popupImage) */}
            {/* <Image 
                src={popupImage} 
                alt="Popup Banner" 
                fill 
                className="object-cover"
            /> */}

            {/* Cách 2: Dùng ảnh thật của Bundle từ Database (Khuyên dùng cách này để ảnh khớp với tên món) */}
            <div className="absolute inset-0 flex items-center justify-center p-0 bg-gradient-to-br from-orange-50 to-white">
                 <img 
                    src={getImageUrl(bundle.image_url)} 
                    alt={bundle.name}
                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
                 />
            </div>

            {/* Sticker giảm giá */}
            <div className="absolute top-6 right-6 bg-red-600 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold shadow-xl animate-bounce border-4 border-white">
                <span className="text-xs">GIẢM</span>
                <span className="text-2xl">{percent}%</span>
            </div>
        </div>

      </div>
    </div>
  );
}