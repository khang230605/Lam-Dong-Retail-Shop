'use client';

import Link from 'next/link';
import { ShoppingCart, Star, Plus, Clock } from 'lucide-react'; // Thêm icon Clock
import { Product } from '@/models/types';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const variants = product.variants || [];

  // --- LOGIC MỚI: ƯU TIÊN HIỂN THỊ GIÁ HÀNG MỚI ---
  const newVariant = variants.find(v => v.type === 'new');
  const nearDateVariant = variants.find(v => v.type === 'near_date');

  // Biến thể dùng để hiển thị thông tin chính (Giá, Tồn kho...)
  // Ưu tiên New, nếu sản phẩm này không bán hàng New (chỉ bán thanh lý) thì mới lấy NearDate
  const displayVariant = newVariant || nearDateVariant;

  if (!displayVariant) return null;

  const currentPrice = displayVariant.price;
  const originalPrice = displayVariant.original_price;
  const isOutOfStock = displayVariant.stock_quantity <= 0;

  // Tính % giảm giá của chính biến thể đang hiển thị
  const discountPercent = (originalPrice && originalPrice > currentPrice) 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) 
    : 0;

  // Hàm thêm nhanh
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isOutOfStock) {
        addToCart(product, displayVariant, 1);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-orange/30 transition-all duration-300 h-full flex flex-col relative">
            
            {/* --- 1. PHẦN ẢNH --- */}
            <div className="relative aspect-square bg-gray-50 p-6 flex items-center justify-center overflow-hidden">
                
                {/* Badge HOT */}
                {product.is_featured && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-2 py-1 rounded shadow-sm z-10 animate-pulse">
                        HOT
                    </span>
                )}

                {/* Badge GIẢM GIÁ (Nếu hàng New đang giảm giá) */}
                {discountPercent > 0 && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-red-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10">
                        -{discountPercent}%
                    </span>
                )}

                <img 
                    src={product.image_url || "https://placehold.co/400x400?text=No+Image"} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition duration-500 ease-in-out mix-blend-multiply"
                />

                {/* Overlay Button (Desktop) */}
                {!isOutOfStock && (
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300 z-20 hidden md:block">
                         <button 
                            onClick={handleQuickAdd}
                            className="w-full bg-brand-orange text-white font-bold py-2 rounded-lg shadow-lg hover:bg-orange-600 flex items-center justify-center gap-2 text-sm"
                         >
                            <ShoppingCart className="w-4 h-4" /> Thêm nhanh
                         </button>
                    </div>
                )}
            </div>

            {/* --- 2. PHẦN THÔNG TIN --- */}
            <div className="p-4 flex flex-col flex-1">
                <div className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">
                    {product.category?.name || "Sản phẩm"}
                </div>
                
                <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-brand-orange transition h-10 leading-tight">
                    {product.name}
                </h3>

                <div className="flex items-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">(12)</span>
                </div>

                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                             <span className="text-lg font-extrabold text-brand-orange">
                                {formatCurrency(currentPrice)}
                             </span>
                             {discountPercent > 0 && (
                                <span className="text-xs text-gray-400 line-through mb-1">
                                    {formatCurrency(originalPrice || 0)}
                                </span>
                             )}
                        </div>
                        
                        {/* Chỉ hiển thị icon nhỏ báo hiệu "Có bán cận date" 
                           chứ KHÔNG hiện giá rẻ để tránh nhầm lẫn 
                        */}
                        {nearDateVariant && nearDateVariant.stock_quantity > 0 && (
                             <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 inline-block px-1.5 py-0.5 rounded border border-green-100 mt-1">
                                <Clock className="w-3 h-3" /> Có Smart Choice
                             </div>
                        )}
                    </div>

                    {/* Button Mobile */}
                    <button 
                        onClick={handleQuickAdd}
                        disabled={isOutOfStock}
                        className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm ${
                            isOutOfStock 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-brand-blue text-white hover:bg-brand-orange'
                        }`}
                    >
                        {isOutOfStock ? <span className="text-[10px]">Hết</span> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    </Link>
  );
}