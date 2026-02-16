'use client';

import { useEffect, useState } from 'react';
import { BundleService } from '@/services/BundleService';
import { formatCurrency } from '@/utils/format';
import { Loader2, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// --- THÊM HÀM XỬ LÝ ẢNH ---
const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://placehold.co/600x400?text=No+Image";
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

export default function BundlesPage() {
  const [bundles, setBundles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundles = async () => {
      const data = await BundleService.getActiveBundles();
      setBundles(data);
      setLoading(false);
    };
    fetchBundles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-8 text-white shadow-lg">
           <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Package className="w-8 h-8" /> Gói Tiết Kiệm (Combos)
           </h1>
           <p className="opacity-90">Mua nhiều giảm sâu - Giải pháp thông minh cho bữa ăn gia đình</p>
        </div>

        {bundles.length === 0 ? (
           <div className="text-center py-12 text-gray-500">
              Chưa có gói combo nào đang mở bán.
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map((bundle) => {
                const savings = bundle.original_price - bundle.price;
                const percent = Math.round((savings / bundle.original_price) * 100);

                return (
                  <Link 
                    key={bundle.id} 
                    href={`/bundles/${bundle.slug}`}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group flex flex-col cursor-pointer"
                  >
                    
                    <div className="relative aspect-video bg-gray-100">
                       {/* SỬA SRC */}
                       <img 
                          src={getImageUrl(bundle.image_url)} 
                          alt={bundle.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                       />
                       <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                          Tiết kiệm {percent}%
                       </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                       <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-brand-orange transition">
                          {bundle.name}
                       </h3>
                       <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                          {bundle.description}
                       </p>

                       <div className="bg-gray-50 p-3 rounded-xl mb-4 text-sm text-gray-600 space-y-1">
                          <p className="font-bold text-xs text-gray-400 mb-1 uppercase">Bao gồm:</p>
                          {bundle.items?.slice(0, 3).map((item: any, idx: number) => (
                             <div key={idx} className="flex justify-between">
                                <span className="truncate pr-2">• {item.variant?.product?.name || "Sản phẩm"}</span>
                                <span className="font-bold text-gray-400">x{item.quantity}</span>
                             </div>
                          ))}
                          {bundle.items?.length > 3 && (
                             <p className="text-xs text-brand-blue italic">+ và {bundle.items.length - 3} món khác</p>
                          )}
                       </div>

                       <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div>
                             <p className="text-gray-400 text-sm line-through decoration-gray-300">
                                {formatCurrency(bundle.original_price)}
                             </p>
                             <p className="text-2xl font-extrabold text-brand-orange">
                                {formatCurrency(bundle.price)}
                             </p>
                          </div>
                          
                          <div className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center group-hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                             <ArrowRight className="w-5 h-5" />
                          </div>
                       </div>
                    </div>
                  </Link>
                );
              })}
           </div>
        )}
      </div>
    </main>
  );
}