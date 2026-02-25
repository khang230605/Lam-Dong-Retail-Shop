'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductService } from '@/services/ProductService';
import { CategoryService, Category } from '@/services/CategoryService';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Filter, ChevronRight, Loader2, ChevronLeft } from 'lucide-react';

function ProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('cat'); 
  const searchTerm = searchParams.get('search'); 
  
  // Lấy trang hiện tại từ URL (Mặc định là 1)
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const itemsPerPage = 16;
  
  const [sortOption, setSortOption] = useState('newest');
  
  // State mới: Lưu TOÀN BỘ sản phẩm lấy từ DB
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      
      // 1. Load danh mục (Sidebar)
      const cats = await CategoryService.getTree();
      setCategories(cats);

      // 2. Load TOÀN BỘ sản phẩm theo điều kiện
      let prods = [];
      if (searchTerm) {
        prods = await ProductService.searchProducts(searchTerm);
      } 
      else if (categorySlug) {
        prods = await ProductService.getProductsByCategory(categorySlug);
      } 
      else {
        // Mặc định -> Lấy TẤT CẢ sản phẩm
        prods = await ProductService.getAllProducts();
      }
      
      setAllProducts(prods);
      setLoading(false);
    };
    initData();
  }, [categorySlug, searchTerm]); 

  // --- LOGIC XỬ LÝ (SẮP XẾP & PHÂN TRANG TRÊN CLIENT) ---

  // 1. Sắp xếp trên TẤT CẢ dữ liệu
  const sortedAllProducts = [...allProducts].sort((a, b) => {
    const priceA = a.variants?.[0]?.price || 0;
    const priceB = b.variants?.[0]?.price || 0;

    if (sortOption === 'price_asc') return priceA - priceB;
    if (sortOption === 'price_desc') return priceB - priceA;
    return 0; // Giữ nguyên (newest)
  });

  // 2. Tính toán phân trang
  const totalPages = Math.max(1, Math.ceil(sortedAllProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // 3. Cắt ra đúng 16 sản phẩm cho trang hiện tại
  const displayProducts = sortedAllProducts.slice(startIndex, startIndex + itemsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hàm đổi bộ lọc
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value);
      handlePageChange(1); // Đổi bộ lọc thì đưa về trang 1
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* --- SIDEBAR DANH MỤC --- */}
      <aside className="lg:w-1/4 flex-shrink-0">
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-lg text-brand-blue mb-4 flex items-center gap-2">
               <Filter className="w-5 h-5" /> Danh mục
            </h3>
            
            <div className="space-y-4">
               {/* Nút Xóa bộ lọc */}
               {(categorySlug || searchTerm) && (
                   <Link href="/products" className="text-sm text-brand-orange hover:underline block mb-4 font-medium">
                       Tất cả sản phẩm
                   </Link>
               )}
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

      {/* --- LƯỚI SẢN PHẨM & PHÂN TRANG --- */}
      <div className="lg:w-3/4 flex flex-col">
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
            <h1 className="font-bold text-xl text-gray-800">
               {searchTerm 
                 ? `Kết quả tìm kiếm: "${searchTerm}"`
                 : categorySlug 
                    ? `Danh mục: ${categories.find(c => c.slug === categorySlug)?.name || 'Sản phẩm'}` 
                    : 'Tất cả sản phẩm'
               }
            </h1>
            
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden md:inline">Sắp xếp:</span>
                <select 
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-orange"
                >
                   <option value="newest">Mới nhất</option>
                   <option value="price_asc">Giá: Thấp đến cao</option>
                   <option value="price_desc">Giá: Cao đến thấp</option>
                </select>
            </div>
         </div>

         {loading ? (
            <div className="flex justify-center py-12 flex-1"><Loader2 className="animate-spin text-brand-orange w-8 h-8"/></div>
         ) : (
            <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
                  {displayProducts.length > 0 ? (
                    displayProducts.map(p => <ProductCard key={p.id} product={p} />)
                  ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 mb-2">
                          {searchTerm 
                            ? `Không tìm thấy sản phẩm nào khớp với "${searchTerm}"`
                            : "Không tìm thấy sản phẩm nào."
                          }
                        </p>
                        <Link href="/products" className="text-brand-orange font-bold hover:underline">Xem tất cả sản phẩm</Link>
                    </div>
                  )}
                </div>

                {/* --- KHỐI ĐIỀU HƯỚNG TRANG --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 mb-4">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-brand-orange hover:text-white hover:border-brand-orange disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 transition"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2 flex-wrap justify-center">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg border transition font-medium ${
                                        currentPage === i + 1 
                                            ? 'bg-brand-orange text-white border-brand-orange shadow-md' 
                                            : 'border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-brand-orange hover:text-white hover:border-brand-orange disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 transition"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </>
         )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
           <Link href="/">Trang chủ</Link> <ChevronRight className="w-4 h-4"/> 
           <span className="font-bold text-gray-800">Sản phẩm</span>
        </div>

        <Suspense fallback={<div className="text-center py-10"><Loader2 className="animate-spin text-brand-orange mx-auto"/></div>}>
           <ProductContent />
        </Suspense>

      </div>
    </main>
  );
}