'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/models/types';
import { formatCurrency, calculateDiscount } from '@/utils/format';
import { ShoppingCart, Heart, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetail({ product }: { product: Product }) {
  // 1. Lọc và tìm các biến thể (Hàng mới và Hàng cận date)
  const variants = product.variants || [];
  const newVariant = variants.find(v => v.type === 'new');
  const nearDateVariant = variants.find(v => v.type === 'near_date');

  // 2. State cho nút công tắc "Smart Choice"
  // Mặc định là TẮT (chọn hàng mới), nếu không có hàng mới thì buộc phải BẬT (chọn hàng cận date)
  const [isSmartChoiceEnabled, setIsSmartChoiceEnabled] = useState(newVariant ? false : true);
  const [quantity, setQuantity] = useState(1);

  // 3. Xác định biến thể đang được chọn dựa trên trạng thái nút công tắc
  const selectedVariant = isSmartChoiceEnabled ? nearDateVariant : newVariant;

  // Xử lý trường hợp không có biến thể nào phù hợp
  if (!selectedVariant) return <div className="p-4">Sản phẩm đang cập nhật giá.</div>;

  // 4. Tính toán giảm giá (Giữa giá hàng mới và giá hàng cận date)
  const discountPercent = (newVariant && nearDateVariant)
    ? calculateDiscount(newVariant.price, nearDateVariant.price)
    : 0;

  // Hàm xử lý khi bấm nút công tắc
  const handleToggleSmartChoice = () => {
    // Chỉ cho phép bật/tắt nếu có đủ cả 2 loại hàng
    if (newVariant && nearDateVariant) {
      setIsSmartChoiceEnabled(!isSmartChoiceEnabled);
    }
  };

    // Lấy hàm thêm vào giỏ từ context
    const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* CỘT TRÁI: ẢNH SẢN PHẨM */}
      <div className="space-y-4">
        <div className="aspect-square bg-white border rounded-2xl overflow-hidden p-8 flex items-center justify-center relative shadow-sm">
           {/* Hiển thị nhãn giảm giá nếu có hàng cận date và đang chọn nó */}
           {isSmartChoiceEnabled && discountPercent > 0 && (
             <span className="absolute top-4 left-4 bg-green-500 text-white font-bold px-3 py-1 rounded-full animate-pulse">
               Giảm {discountPercent}%
             </span>
           )}
           <img
             src={product.image_url || "https://placehold.co/600x600"}
             alt={product.name}
             className="w-full h-full object-contain hover:scale-110 transition duration-500"
           />
        </div>
      </div>

      {/* CỘT PHẢI: THÔNG TIN & CHỌN MUA */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

        {/* Rating giả lập */}
        <div className="flex items-center gap-2 mb-6 text-sm">
           <div className="flex text-brand-yellow">★★★★★</div>
           <span className="text-gray-400">(120 đánh giá)</span>
           <span className="text-gray-300">|</span>
           <span className="text-green-600 font-semibold">Còn hàng</span>
        </div>

        {/* GIÁ TIỀN HIỆN TẠI */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex items-end gap-3">
             <span className="text-4xl font-extrabold text-brand-orange">
               {formatCurrency(selectedVariant.price)}
             </span>
             {/* Nếu đang chọn Smart Choice, hiện giá gốc của hàng mới để so sánh */}
             {isSmartChoiceEnabled && newVariant && (
               <span className="text-xl text-gray-400 line-through mb-1">
                 {formatCurrency(newVariant.price)}
               </span>
             )}
          </div>
        </div>

        {/* --- THAY ĐỔI CHÍNH: NÚT CÔNG TẮC SMART CHOICE --- */}
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
           <div className="flex-1">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                Smart Choice
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {isSmartChoiceEnabled && nearDateVariant
                  ? <span>
                      Best before: <b>{new Date(nearDateVariant.expiry_date || "").toLocaleDateString('vi-VN')}</b>
                      <br/>
                      Giá chỉ còn: <b className="text-brand-orange">{formatCurrency(nearDateVariant.price)}</b>
                    </span>
                  : "Bật để chọn hàng cận date với giá ưu đãi hơn."
                }
              </p>
           </div>

           {/* Nút Toggle Switch */}
           <button
              onClick={handleToggleSmartChoice}
              // Vô hiệu hóa nút nếu thiếu 1 trong 2 loại hàng
              disabled={!newVariant || !nearDateVariant}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0 ${
                 isSmartChoiceEnabled ? 'bg-green-500' : 'bg-gray-300'
              } ${(!newVariant || !nearDateVariant) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
           >
              <div
                 className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                    isSmartChoiceEnabled ? 'transform translate-x-6' : ''
                 }`}
              />
           </button>
        </div>
        {/* -------------------------------------------------- */}

        {/* CHỌN SỐ LƯỢNG & NÚT MUA */}
        <div className="flex gap-4 mb-8">
           <div className="flex items-center border border-gray-300 rounded-full h-12">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-full hover:bg-gray-100 rounded-l-full font-bold"
              >-</button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-12 text-center outline-none bg-transparent font-bold"
              />
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-full hover:bg-gray-100 rounded-r-full font-bold"
              >+</button>
           </div>

           <button 
                onClick={() => addToCart(product, selectedVariant, quantity)} 
                className="flex-1 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-200">
              <ShoppingCart className="w-5 h-5" /> Thêm vào giỏ
           </button>

           <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-red-500 transition">
              <Heart className="w-6 h-6" />
           </button>
        </div>

        {/* CAM KẾT & HƯỚNG DẪN */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
           <div className="flex gap-2">
             <Truck className="w-5 h-5 text-brand-blue" /> Giao hàng 2h
           </div>
           <div className="flex gap-2">
             <ShieldCheck className="w-5 h-5 text-brand-blue" /> Đổi trả 24h
           </div>
        </div>

        {/* HƯỚNG DẪN SỬ DỤNG (ACCORDION) */}
        {product.usage_instruction && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-bold text-gray-800 mb-2">Hướng dẫn sử dụng:</h3>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
              {product.usage_instruction}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}