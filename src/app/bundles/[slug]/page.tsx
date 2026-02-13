'use client';

import { useEffect, useState, use } from 'react'; // 1. Thêm import 'use'
import { BundleService } from '@/services/BundleService';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { ShoppingBag, ArrowLeft, CheckCircle2, Package, Loader2 } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';

// 2. Định nghĩa lại kiểu Props cho đúng chuẩn Next.js 15 (params là Promise)
export default function BundleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // 3. Dùng use() để lấy slug từ Promise
  const { slug } = use(params);
  const { addBundleToCart } = useCart(); // Lấy hàm mới
  const router = useRouter();
  const { addToCart } = useCart();
  const [bundle, setBundle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 4. Dùng biến 'slug' đã unwrap thay vì params.slug
      const data = await BundleService.getBundleBySlug(slug);
      
      if (!data) {
        // Xử lý nếu không tìm thấy bundle (tránh lỗi crash)
        setLoading(false);
        return; 
      }
      setBundle(data);
      setLoading(false);
    };
    fetchData();
  }, [slug]); // 5. Dependency là slug

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-orange"/></div>;
  if (!bundle) return notFound();

  // LOGIC MỚI: Thêm nguyên cục Bundle vào giỏ
  const handleAddBundleToCart = () => {
    addBundleToCart(bundle);
    alert(`Đã thêm gói "${bundle.name}" vào giỏ hàng!`);
    // Có thể router.push('/giohang') nếu muốn chuyển trang luôn
  };

  const savings = bundle.original_price - bundle.price;
  const percent = Math.round((savings / bundle.original_price) * 100);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative bg-gray-900 text-white">
         <div className="absolute inset-0 overflow-hidden opacity-40">
            <img src={bundle.image_url} className="w-full h-full object-cover blur-sm" />
         </div>
         
         <div className="relative container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
            {/* Ảnh đại diện Combo */}
            <div className="w-full md:w-1/2 max-w-lg">
               <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img src={bundle.image_url} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                     Tiết kiệm {percent}%
                  </div>
               </div>
            </div>

            {/* Thông tin */}
            <div className="w-full md:w-1/2 space-y-4">
               <Link href="/bundles" className="inline-flex items-center text-gray-300 hover:text-white text-sm mb-2">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại danh sách
               </Link>
               <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  {bundle.name}
               </h1>
               <p className="text-gray-200 text-lg leading-relaxed">
                  {bundle.description}
               </p>
               
               <div className="pt-4 flex items-end gap-4">
                  <div className="text-4xl md:text-5xl font-extrabold text-brand-orange">
                     {formatCurrency(bundle.price)}
                  </div>
                  <div className="text-xl text-gray-400 line-through mb-2">
                     {formatCurrency(bundle.original_price)}
                  </div>
               </div>

               <button 
                  onClick={handleAddBundleToCart}
                  disabled={adding}
                  className="bg-brand-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-900/50 flex items-center gap-3 mt-4"
               >
                  {adding ? <Loader2 className="animate-spin"/> : (
                    <>
                      <ShoppingBag className="w-6 h-6" /> MUA NGAY COMBO NÀY
                    </>
                  )}
               </button>
               <p className="text-xs text-gray-400 italic">* Giá đã bao gồm VAT. Số lượng có hạn.</p>
            </div>
         </div>
      </div>

      {/* 2. DANH SÁCH MÓN TRONG GÓI */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
               <Package className="w-6 h-6 text-brand-blue" /> Combo bao gồm những gì?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {bundle.items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-brand-blue/30 hover:bg-blue-50/50 transition bg-gray-50">
                     
                     {/* Ảnh nhỏ của món */}
                     <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 overflow-hidden border border-gray-200">
                        <img 
                           src={item.variant?.product?.image_url || "https://placehold.co/100"} 
                           className="w-full h-full object-cover"
                        />
                     </div>

                     <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.variant?.product?.slug}`} className="font-bold text-gray-800 hover:text-brand-orange truncate block">
                           {item.variant?.product?.name}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                           Phân loại: <span className="font-medium text-brand-blue">
                              {item.variant?.type === 'new' ? 'Hàng Mới' : 'Cận Date'}
                           </span>
                        </div>
                        <div className="text-sm text-gray-500">
                           Đơn giá gốc: {formatCurrency(item.variant?.price)}
                        </div>
                     </div>

                     {/* Số lượng */}
                     <div className="flex flex-col items-center justify-center px-4 border-l border-gray-200 pl-4">
                        <span className="text-xs text-gray-400 uppercase font-bold">Số lượng</span>
                        <span className="text-2xl font-extrabold text-brand-orange">x{item.quantity}</span>
                     </div>
                  </div>
               ))}
            </div>

            {/* Thông báo cam kết */}
            <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
               <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
               <div>
                  <h4 className="font-bold text-green-800">Cam kết chất lượng</h4>
                  <p className="text-sm text-green-700">
                     Tất cả sản phẩm trong gói đều được kiểm tra kỹ lưỡng trước khi đóng gói. 
                     Hàng cận date đảm bảo vẫn còn hạn sử dụng ít nhất 2 ngày khi giao đến tay bạn.
                  </p>
               </div>
            </div>

         </div>
      </div>
    </main>
  );
}