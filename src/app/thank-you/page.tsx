'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-lg text-center border border-gray-100">
        
        {/* Icon thành công */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Đặt hàng thành công!</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Cảm ơn bạn đã ủng hộ <b>Lâm Đồng Retail</b>. <br/>
          Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến địa chỉ đăng ký.
        </p>

        {/* Các nút điều hướng */}
        <div className="space-y-3">
          <Link 
            href="/profile" 
            className="block w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200"
          >
            Xem đơn hàng của tôi
          </Link>
          
          <Link 
            href="/" 
            className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" /> Tiếp tục mua sắm
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Mọi thắc mắc xin vui lòng liên hệ hotline: <b className="text-brand-blue">1900 888</b>
        </p>
      </div>
    </div>
  );
}