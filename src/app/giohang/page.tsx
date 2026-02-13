'use client';

import Link from 'next/link';
import { useCart, CartItem } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag, Package } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    // ... (Giữ nguyên giao diện giỏ trống) ...
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng đang trống</h2>
            <Link href="/" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition inline-flex items-center gap-2 mt-4">
                <ArrowLeft className="w-5 h-5" /> Quay lại mua sắm
            </Link>
            </div>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-blue mb-8 flex items-center gap-2">
          <ShoppingBag className="w-8 h-8" /> Giỏ hàng của bạn 
          <span className="text-lg font-normal text-gray-500">({items.length} món)</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* CỘT TRÁI: LIST ITEM */}
          <div className="flex-1 space-y-4">
            {items.map((item, index) => {
              // 1. NẾU LÀ BUNDLE
              if (item.type === 'bundle') {
                 const bundle = item.bundle;
                 return (
                    <div key={`bundle-${index}`} className="bg-white p-4 rounded-2xl shadow-sm border border-orange-200 flex flex-col md:flex-row items-start md:items-center gap-4 relative overflow-hidden">
                       {/* Dải băng Bundle */}
                       <div className="absolute top-0 left-0 bg-brand-orange text-white text-[10px] px-2 py-1 rounded-br-lg font-bold z-10">
                          COMBO TIẾT KIỆM
                       </div>

                       <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 border overflow-hidden">
                          <img src={bundle.image_url} className="w-full h-full object-cover" />
                       </div>

                       <div className="flex-1 min-w-0 pt-2 md:pt-0">
                          <h3 className="font-bold text-gray-800 text-lg truncate">{bundle.name}</h3>
                          
                          {/* Liệt kê các món trong bundle */}
                          <div className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded-lg">
                             <p className="font-bold mb-1 flex items-center gap-1"><Package className="w-3 h-3"/> Gồm:</p>
                             <ul className="list-disc list-inside">
                                {bundle.items?.map((subItem: any, idx: number) => (
                                   <li key={idx} className="truncate">
                                      {subItem.quantity}x {subItem.variant?.product?.name}
                                   </li>
                                ))}
                             </ul>
                          </div>
                       </div>

                       {/* Giá & Số lượng */}
                       <div className="flex items-center gap-4 ml-auto mt-2 md:mt-0">
                          <div className="font-bold text-brand-orange w-24 text-right">
                             {formatCurrency(bundle.price)}
                          </div>
                          <div className="flex items-center border rounded-full h-9">
                             <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-8 h-full hover:bg-gray-100 rounded-l-full"><Minus className="w-4 h-4 mx-auto"/></button>
                             <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                             <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-8 h-full hover:bg-gray-100 rounded-r-full"><Plus className="w-4 h-4 mx-auto"/></button>
                          </div>
                          <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                       </div>
                    </div>
                 );
              }

              // 2. NẾU LÀ SẢN PHẨM THƯỜNG
              const product = item.product;
              const variant = item.variant;
              return (
                <div key={`prod-${index}`} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 border overflow-hidden">
                    <img src={product.image_url} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                       {variant.type === 'near_date' ? (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">⚡ Cận Date</span>
                       ) : (
                          <span className="bg-blue-50 text-brand-blue text-xs px-2 py-1 rounded font-bold">✨ Hàng Mới</span>
                       )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                     <div className="font-bold text-gray-700 w-24 text-right">
                        {formatCurrency(variant.price)}
                     </div>
                     <div className="flex items-center border rounded-full h-9">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-8 h-full hover:bg-gray-100 rounded-l-full"><Minus className="w-4 h-4 mx-auto"/></button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-8 h-full hover:bg-gray-100 rounded-r-full"><Plus className="w-4 h-4 mx-auto"/></button>
                     </div>
                     <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                  </div>
                </div>
              );
            })}
            
            <button onClick={clearCart} className="text-red-500 text-sm hover:underline mt-4 pl-2">Xóa tất cả</button>
          </div>

          {/* CỘT PHẢI: TỔNG TIỀN */}
          <div className="lg:w-96 flex-shrink-0">
             <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Tóm tắt đơn hàng</h3>
                <div className="flex justify-between items-end mb-8 border-t pt-4">
                   <span className="font-bold text-gray-800">Tổng cộng:</span>
                   <span className="block text-3xl font-extrabold text-brand-orange">{formatCurrency(totalPrice)}</span>
                </div>
                <Link href="/checkout" className="block w-full bg-brand-orange text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg">
                   Tiến hành đặt hàng <ArrowRight className="inline-block w-5 h-5 ml-1" />
                </Link>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}