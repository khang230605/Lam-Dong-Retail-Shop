'use client';

import { useEffect, useState, Suspense } from 'react'; // Thêm Suspense
import { useSearchParams } from 'next/navigation'; // 1. Import hook này
import { ProductService } from '@/services/ProductService';
import { CategoryService, Category } from '@/services/CategoryService';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Filter, ChevronRight, Loader2 } from 'lucide-react';

// Tách nội dung chính ra thành một component con để bọc Suspense
function ProductContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('cat'); 
  const searchTerm = searchParams.get('search'); //Lấy từ khóa tìm kiếm
  
  // State mới để lưu kiểu sắp xếp
  const [sortOption, setSortOption] = useState('newest');

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      
      // 1. Load danh mục (Sidebar)
      const cats = await CategoryService.getTree();
      setCategories(cats);

      // 2. Load sản phẩm
      let prods = [];
      if (searchTerm) {
        // 2. Nếu có từ khóa -> Tìm kiếm
        prods = await ProductService.searchProducts(searchTerm);
      } 
      else if (categorySlug) {
        // 3. Nếu có danh mục -> Lọc danh mục
        prods = await ProductService.getProductsByCategory(categorySlug);
      } 
      else {
        // 4. Mặc định -> Lấy nổi bật
        prods = await ProductService.getDailyFeatured();
      }
      
      setProducts(prods);
      setLoading(false);
    };
    initData();
  }, [categorySlug, searchTerm]);// Chạy lại khi URL thay đổi

  // Logic Sắp xếp (Client Side Sorting)
  const sortedProducts = [...products].sort((a, b) => {
    // Lấy giá thấp nhất của mỗi sp để so sánh
    const priceA = a.variants?.[0]?.price || 0;
    const priceB = b.variants?.[0]?.price || 0;

    if (sortOption === 'price_asc') return priceA - priceB;
    if (sortOption === 'price_desc') return priceB - priceA;
    return 0; // Mặc định (newest) giữ nguyên thứ tự API trả về
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* --- SIDEBAR DANH MỤC (Giữ nguyên code cũ) --- */}
      <aside className="lg:w-1/4 flex-shrink-0">
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-lg text-brand-blue mb-4 flex items-center gap-2">
               <Filter className="w-5 h-5" /> Danh mục
            </h3>
            
            <div className="space-y-4">
               {categories.map(parent => (
                  <div key={parent.id}>
                     <Link 
                       href={`/products?cat=${parent.slug}`}
                       className={`font-bold block mb-2 hover:text-brand-orange transition ${categorySlug === parent.slug ? 'text-brand-orange' : 'text-gray-800'}`}
                     >
                        {parent.name}
                     </Link>
                     <ul className="pl-4 space-y-2 border-l-2 border-gray-100 ml-1">
                        {parent.children?.map(child => (
                           <li key={child.id}>
                              <Link 
                                href={`/products?cat=${child.slug}`}
                                className={`text-sm block hover:text-brand-orange transition ${categorySlug === child.slug ? 'text-brand-orange font-bold' : 'text-gray-500'}`}
                              >
                                 {child.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>
      </aside>

      {/* --- LƯỚI SẢN PHẨM --- */}
      <div className="lg:w-3/4">
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
            <h1 className="font-bold text-xl text-gray-800">
               {/* 6. Cập nhật tiêu đề hiển thị cho đúng ngữ cảnh */}
               {searchTerm 
                 ? `Kết quả tìm kiếm: "${searchTerm}"`
                 : categorySlug 
                    ? `Danh mục: ${categories.find(c => c.slug === categorySlug)?.name || 'Sản phẩm'}` 
                    : 'Tất cả sản phẩm'
               }
            </h1>
            
            {/* Dropdown Sắp xếp */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sắp xếp:</span>
                <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-orange"
                >
                   <option value="newest">Mới nhất</option>
                   <option value="price_asc">Giá: Thấp đến cao</option>
                   <option value="price_desc">Giá: Cao đến thấp</option>
                </select>
            </div>
         </div>

         {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-brand-orange"/></div>
         ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.length > 0 ? (
                // Logic hiển thị sản phẩm giữ nguyên
                sortedProducts.map(p => <ProductCard key={p.id} product={p} />)
              ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 mb-2">
                      {searchTerm 
                        ? `Không tìm thấy sản phẩm nào khớp với "${searchTerm}"`
                        : "Không tìm thấy sản phẩm nào trong danh mục này."
                      }
                    </p>
                    <Link href="/products" className="text-brand-orange font-bold hover:underline">Xem tất cả sản phẩm</Link>
                </div>
              )}
            </div>
         )}
      </div>
    </div>
  );
}

// Component chính export ra ngoài
export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
           <Link href="/">Trang chủ</Link> <ChevronRight className="w-4 h-4"/> 
           <span className="font-bold text-gray-800">Tất cả sản phẩm</span>
        </div>

        {/* BẮT BUỘC: Phải bọc useSearchParams trong Suspense nếu không build sẽ lỗi */}
        <Suspense fallback={<div className="text-center py-10">Đang tải danh sách...</div>}>
           <ProductContent />
        </Suspense>

      </div>
    </main>
  );
}