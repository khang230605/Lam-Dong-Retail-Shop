'use client';

import { useState, useEffect } from 'react';
import { BundleService } from '@/services/BundleService';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { X, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [bundle, setBundle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addBundleToCart } = useCart();

  useEffect(() => {
    const initPopup = async () => {
      // 1. Kiểm tra xem user đã tắt popup trong phiên này chưa
      const hasSeen = sessionStorage.getItem('seen_home_popup');
      if (hasSeen) {
        setLoading(false);
        return; 
      }

      // 2. Lấy danh sách Bundle
      const data = await BundleService.getActiveBundles();
      
      // Lấy gói đầu tiên làm "Deal Hot" (Hoặc logic: tìm gói giảm giá nhiều nhất)
      if (data && data.length > 0) {
        setBundle(data[0]); 
        
        // Hiện popup sau 1.5 giây cho mượt
        setTimeout(() => {
            setIsVisible(true);
        }, 1500);
      }
      setLoading(false);
    };

    initPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Lưu lại là đã xem để không hiện lại lúc F5 (Xóa dòng này nếu muốn test hiện liên tục)
    sessionStorage.setItem('seen_home_popup', 'true');
  };

  const handleAddToCart = () => {
    if (bundle) {
        addBundleToCart(bundle);
        alert(`Đã thêm "${bundle.name}" vào giỏ hàng!`);
        handleClose(); // Thêm xong thì đóng popup luôn
    }
  };

  // Nếu không có bundle hoặc chưa đến lúc hiện thì không render gì cả
  if (!isVisible || !bundle) return null;

  const savings = bundle.original_price - bundle.price;
  const percent = Math.round((savings / bundle.original_price) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Lớp nền tối (Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity duration-300 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Nội dung Popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-scale-up flex flex-col md:flex-row">
        
        {/* Nút đóng (X) */}
        <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition text-gray-500"
        >
            <X className="w-5 h-5" />
        </button>

        {/* CỘT TRÁI: THÔNG TIN */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-white/90">
            <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-extrabold uppercase tracking-wider rounded mb-4 w-fit">
                Deal of the Day
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue mb-4 leading-tight">
                {bundle.name}
            </h2>
            
            <p className="text-gray-500 mb-6 line-clamp-2">
                {bundle.description}
            </p>

            <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-extrabold text-green-600">
                    {formatCurrency(bundle.price)}
                </span>
                <div className="flex flex-col mb-1">
                    <span className="text-sm text-gray-400 font-bold strike-through line-through">
                        {formatCurrency(bundle.original_price)}
                    </span>
                    <span className="text-xs text-red-500 font-bold">
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

        {/* CỘT PHẢI: HÌNH ẢNH (Background Image) */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-green-50">
            {/* Hình nền trang trí (nếu có) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            
            {/* Ảnh sản phẩm chính */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                    src={bundle.image_url || "https://placehold.co/600x600"} 
                    alt={bundle.name}
                    className="w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition duration-700"
                />
            </div>

            {/* Sticker giảm giá nổi */}
            <div className="absolute top-6 right-6 bg-red-600 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold shadow-lg animate-bounce">
                <span className="text-xs">GIẢM</span>
                <span className="text-2xl">{percent}%</span>
            </div>
        </div>

      </div>
    </div>
  );
}