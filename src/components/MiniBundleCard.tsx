'use client';

import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import { Package, ArrowRight } from 'lucide-react';

export default function MiniBundleCard({ bundle }: { bundle: any }) {
  const savings = bundle.original_price - bundle.price;
  const percent = Math.round((savings / bundle.original_price) * 100);

  return (
    <Link href={`/bundles/${bundle.slug}`} className="block group">
      <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl overflow-hidden hover:shadow-md transition relative">
        
        {/* Badge nổi bật */}
        <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 animate-pulse">
          TIẾT KIỆM {percent}%
        </div>

        <div className="flex p-3 gap-3 items-center">
            {/* Ảnh nhỏ */}
            <div className="w-16 h-16 bg-white rounded-lg border border-orange-100 flex-shrink-0 overflow-hidden">
                <img 
                    src={bundle.image_url} 
                    alt={bundle.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                />
            </div>

            {/* Thông tin */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[10px] text-orange-600 font-bold uppercase mb-0.5">
                    <Package className="w-3 h-3" /> Combo có món này
                </div>
                <h4 className="font-bold text-gray-800 text-sm truncate group-hover:text-brand-orange transition">
                    {bundle.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="font-extrabold text-brand-orange text-sm">
                        {formatCurrency(bundle.price)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                        {formatCurrency(bundle.original_price)}
                    </span>
                </div>
            </div>
            
            <div className="text-orange-400">
                <ArrowRight className="w-4 h-4" />
            </div>
        </div>
      </div>
    </Link>
  );
}