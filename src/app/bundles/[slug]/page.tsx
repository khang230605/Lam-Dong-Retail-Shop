'use client';

import { useEffect, useState, use } from 'react';
import { BundleService } from '@/services/BundleService';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { ShoppingBag, ArrowLeft, CheckCircle2, Package, Loader2 } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';

// --- THÊM HÀM XỬ LÝ ẢNH ---
const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://placehold.co/800x400?text=No+Image";
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

export default function BundleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addBundleToCart } = useCart();
  const [bundle, setBundle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await BundleService.getBundleBySlug(slug);
      if (!data) {
        setLoading(false);
        return; 
      }
      setBundle(data);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-orange"/></div>;
  if (!bundle) return notFound();

  const handleAddBundleToCart = () => {
    addBundleToCart(bundle);
    alert(`Đã thêm gói "${bundle.name}" vào giỏ hàng!`);
  };

  const savings = bundle.original_price - bundle.price;
  const percent = Math.round((savings / bundle.original_price) * 100);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* HERO SECTION */}
      <div className="relative bg-gray-900 text-white">
         <div className="absolute inset-0 overflow-hidden opacity-40">
            {/* SỬA SRC */}
            <img src={getImageUrl(bundle.image_url)} className="w-full h-full object-cover blur-sm" />
         </div>
         
         <div className="relative container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 max-w-lg">
               <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  {/* SỬA SRC */}
                  <img src={getImageUrl(bundle.image_url)} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                     Tiết kiệm {percent}%
                  </div>
               </div>
            </div>

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

      {/* DANH SÁCH MÓN */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
               <Package className="w-6 h-6 text-brand-blue" /> Combo bao gồm những gì?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {bundle.items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-brand-blue/30 hover:bg-blue-50/50 transition bg-gray-50">
                     
                     <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 overflow-hidden border border-gray-200">
                        {/* SỬA SRC CHO ITEM CON */}
                        <img 
                           src={getImageUrl(item.variant?.product?.image_url)} 
                           className="w-full h-full object-cover"
                        />
                     </div>

                     <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.variant?.product?.slug}`} className="font-bold text-gray-800 hover:text-brand-orange truncate block">
                            {item.variant?.product?.name}
                        </Link>
                        
                        {/* --- THÊM DÒNG HẠN SỬ DỤNG Ở ĐÂY --- */}
                        {item.variant?.expiry_date && (
                            <div className="text-xs text-red-600 font-bold mt-1 bg-red-50 inline-block px-2 py-0.5 rounded border border-red-100">
                                Dùng trước: {new Date(item.variant.expiry_date).toLocaleDateString('vi-VN')}
                            </div>
                        )}

                        <div className="text-sm text-gray-500 mt-1">
                            Đơn giá gốc: {formatCurrency(item.variant?.price)}
                        </div>
                    </div>

                     <div className="flex flex-col items-center justify-center px-4 border-l border-gray-200 pl-4">
                        <span className="text-xs text-gray-400 uppercase font-bold">Số lượng</span>
                        <span className="text-2xl font-extrabold text-brand-orange">x{item.quantity}</span>
                     </div>
                  </div>
               ))}
            </div>

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