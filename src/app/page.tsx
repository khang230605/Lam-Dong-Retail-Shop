import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { ProductService } from '@/services/ProductService';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HomePopup from '@/components/HomePopup';

export default async function Home() {
  // 1. Gọi Data từ Service (Server Side Rendering)
  const products = await ProductService.getDailyFeatured();
  
  // Tạm thời lấy categories (nếu cần hiển thị sau này)
  // const categories = await ProductService.getCategories();

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <HomePopup />
      {/* 1. Banner quảng cáo lớn */}
      <HeroSection />

      {/* 2. Danh sách sản phẩm nổi bật */}
      <section className="container mx-auto px-4 mt-12">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-brand-blue mb-2">Sản phẩm nổi bật</h2>
                <p className="text-gray-500">Đừng bỏ lỡ các ưu đãi hấp dẫn nhất trong ngày</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-1 text-brand-orange font-bold hover:underline">
                Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
        
        {/* Grid sản phẩm: Mobile 2 cột, PC 4 hoặc 5 cột */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
           {products.length > 0 ? (
             products.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))
           ) : (
             <p className="col-span-full text-center py-10 text-gray-500">
               Chưa có sản phẩm nào. Hãy thêm trong Database nhé!
             </p>
           )}
        </div>
      </section>

      {/* 3. Section Gói Combo (Demo) */}
      <section className="container mx-auto px-4 mt-20">
         <div className="bg-brand-orange/5 rounded-2xl p-8 border border-brand-orange/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-brand-orange mb-2">⚡ Gói Tiết Kiệm Thông Minh</h2>
                    <p className="text-gray-600">
                        Mua theo combo các sản phẩm cận date để tiết kiệm tới 50% chi phí.
                        Chung tay chống lãng phí thực phẩm!
                    </p>
                </div>
                <Link href="/bundles" className="bg-brand-orange text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition whitespace-nowrap">
                    Khám phá ngay
                </Link>
            </div>
         </div>
      </section>

    </main>
  );
}