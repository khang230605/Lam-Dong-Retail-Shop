'use client';

import { useEffect, useState, use } from 'react';
import { ProductService } from '@/services/ProductService';
import { ReviewService } from '@/services/ReviewService';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { ShoppingCart, Clock, ShieldCheck, Star, User, Loader2, ArrowRight, ChefHat, X, Info } from 'lucide-react'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/utils/supabase';
import { BundleService } from '@/services/BundleService';
import MiniBundleCard from '@/components/MiniBundleCard';

const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://placehold.co/600x600?text=No+Image";
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [containingBundles, setContainingBundles] = useState<any[]>([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [selectedType, setSelectedType] = useState<'new' | 'near_date'>('new');
  
  const [activeRecipe, setActiveRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const data = await ProductService.getProductBySlug(slug);
      
      if (!data) {
        setLoading(false);
        return; 
      }
      setProduct(data);

      const [related, reviewList, bundles] = await Promise.all([
        ProductService.getRelatedProducts(data.category_id || 0, data.id), 
        ReviewService.getReviewsByProductId(data.id),
        BundleService.getBundlesContainingProduct(data.id)
      ]);
      
      setContainingBundles(bundles);
      setRelatedProducts(related);
      setReviews(reviewList);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmittingReview(true);
    try {
      await ReviewService.createReview(product.id, rating, comment);
      const newReviews = await ReviewService.getReviewsByProductId(product.id);
      setReviews(newReviews);
      setComment('');
      alert('Cảm ơn bạn đã đánh giá!');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-orange"/></div>;
  if (!product) return notFound();

  const newVariant = product.variants.find((v: any) => v.type === 'new');
  const nearDateVariant = product.variants.find((v: any) => v.type === 'near_date');
  
  let currentVariant = selectedType === 'new' ? newVariant : nearDateVariant;
  if (!currentVariant && newVariant) currentVariant = newVariant;

  const savings = (newVariant?.price || 0) - (nearDateVariant?.price || 0);
  const savingsPercent = newVariant ? Math.round((savings / newVariant.price) * 100) : 0;
  
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const isSmartChoiceEnabled = selectedType === 'near_date';
  
  const handleToggleSmartChoice = () => {
    if (selectedType === 'new') setSelectedType('near_date');
    else setSelectedType('new');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 relative">
      
      {/* --- MODAL CÔNG THỨC CHO MOBILE --- */}
      {activeRecipe && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveRecipe(null)}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10 animate-scale-up">
                <div className="bg-brand-orange text-white p-4 pr-12 relative">
                    <h3 className="font-bold text-lg leading-tight">{activeRecipe.name}</h3>
                    <button 
                        onClick={() => setActiveRecipe(null)}
                        className="absolute top-1/2 -translate-y-1/2 right-4 text-white hover:bg-white/20 rounded-full p-1 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div 
                    className="p-5 max-h-[60vh] overflow-y-auto text-gray-700 whitespace-pre-line leading-relaxed text-sm bg-orange-50/30"
                    dangerouslySetInnerHTML={{ __html: activeRecipe.instruction }}
                />
                <div className="p-4 border-t border-gray-100 bg-white">
                    <button 
                        onClick={() => setActiveRecipe(null)}
                        className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        
        <div className="text-sm text-gray-500 mb-6">
           <Link href="/">Trang chủ</Link> / <Link href="/products">Sản phẩm</Link> / <span className="text-gray-800 font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <div className="lg:col-span-3 space-y-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                      {/* ẢNH */}
                      <div className="p-8 flex items-center justify-center bg-gray-50 relative min-h-[300px] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                         <img 
                            src={getImageUrl(product.image_url)} 
                            alt={product.name} 
                            className="max-w-full max-h-[350px] object-contain drop-shadow-xl"
                         />
                         {isSmartChoiceEnabled && nearDateVariant && (
                            <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse z-10">
                               Tiết kiệm {savingsPercent}%
                            </div>
                         )}
                      </div>

                      {/* THÔNG TIN & MUA HÀNG */}
                      {/* Đã gỡ bỏ z-10 ở đây để Layer Tooltip có thể ngoi lên trên Header */}
                      <div className="p-8 pl-8 md:pl-0 flex flex-col relative">
                         <div className="mb-2">
                            <span className="text-brand-blue font-bold text-xs uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">
                                {product.category?.name || "Sản phẩm"}
                            </span>
                         </div>
                         
                         <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                            {product.name}
                         </h1>

                         <div className="flex items-center gap-1 text-yellow-500 font-bold mb-6 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{avgRating || "5.0"}</span>
                            <span className="text-gray-400 font-normal">({reviews.length} đánh giá)</span>
                         </div>
                         
                         {/* SWITCHER SMART CHOICE */}
                         {nearDateVariant && (
                             // Thêm class 'relative' vào thẻ div ngoài cùng
                             <div className={`relative mb-6 p-4 border rounded-xl flex items-center justify-between transition-colors duration-300 ${isSmartChoiceEnabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                 
                                 {/* --- ICON INFO & TOOLTIP (GÓC PHẢI TRÊN) --- */}
                                 <div className="absolute top-2.5 right-3 group/info z-20">
                                     {/* Chữ i */}
                                     <Info className={`w-4 h-4 cursor-pointer transition-colors ${isSmartChoiceEnabled ? 'text-green-600/70 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'}`} />
                                     
                                     {/* Hộp thoại Tooltip hiện ra khi di chuột */}
                                     <div className="absolute bottom-full right-0 mb-2 w-64 p-3.5 bg-white border border-gray-200 shadow-xl rounded-xl text-xs text-gray-600 leading-relaxed opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-300 origin-bottom-right">
                                         <span className="font-bold text-brand-orange block mb-1">Smart-Saver là gì?</span>
                                         Hơn cả mức giá hời, Smart Choice giúp bạn khớp nối hoàn hảo giữa hạn bảo quản và thời điểm lên bếp. Mua đúng lúc, dùng đúng chỗ – tối ưu chi tiêu và nói không với lãng phí!
                                         
                                         {/* Mũi tên nhỏ chĩa xuống của Tooltip */}
                                         <div className="absolute -bottom-1.5 right-1 w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                                     </div>
                                 </div>

                                 {/* Thêm pr-6 để chữ không bị đè vào nút i khi trên màn hình quá nhỏ */}
                                 <div className="flex-1 pr-6">
                                     <h3 className={`font-bold flex items-center gap-2 ${isSmartChoiceEnabled ? 'text-green-800' : 'text-gray-800'}`}>
                                         {isSmartChoiceEnabled ? <Clock className="w-4 h-4"/> : <ShieldCheck className="w-4 h-4"/>}
                                         Smart-Saver {isSmartChoiceEnabled ? '(Đã bật)' : ''}
                                     </h3>
                                     <div className="text-sm text-gray-600 mt-1">
                                         <span>
                                             Dùng trước: <b>{new Date(nearDateVariant.expiry_date).toLocaleDateString('vi-VN')}</b>
                                             <br/>
                                             Giá sốc: <b className="text-brand-orange text-base">{formatCurrency(nearDateVariant.price)}</b>
                                         </span>
                                     </div>
                                 </div>

                                 {/* Nút Toggle */}
                                 <button
                                     onClick={handleToggleSmartChoice}
                                     className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0 ${
                                         isSmartChoiceEnabled ? 'bg-green-500' : 'bg-gray-300'
                                     } cursor-pointer`}
                                 >
                                     <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${isSmartChoiceEnabled ? 'transform translate-x-6' : ''}`} />
                                 </button>
                             </div>
                         )}

                         {/* --- KHỐI GỢI Ý CÔNG THỨC NẤU ĂN --- */}
                         {product.recipes && (
                             <div className="mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100">
                                 <h3 className="font-bold text-brand-orange mb-3 flex items-center gap-2">
                                     <ChefHat className="w-5 h-5" />
                                     {product.recipes.title || "Gợi ý công thức món ngon"}
                                 </h3>
                                 <div className="flex flex-col gap-2 relative">
                                     {product.recipes.items?.map((recipe: any, idx: number) => (
                                         <div key={idx} className="relative group">
                                             {/* Nút tên món */}
                                             <button
                                                 onClick={() => setActiveRecipe(recipe)}
                                                 className="w-full text-left font-semibold text-gray-700 bg-white px-4 py-3 rounded-lg border border-orange-100 hover:border-brand-orange hover:text-brand-orange transition cursor-pointer flex justify-between items-center shadow-sm"
                                             >
                                                 <span className="truncate pr-4">{recipe.name}</span>
                                                 <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                             </button>

                                             {/* Tooltip Hover (Đã sửa lỗi mất hover khi scroll) */}
                                            <div className="hidden md:block absolute bottom-full left-0 pb-3 w-full min-w-[350px] z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                                <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-5 relative transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                    {/* Mũi tên chĩa xuống */}
                                                    <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                                                    
                                                    <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2 text-brand-orange">
                                                        {recipe.name}
                                                    </h4>
                                                    {/* Max height và Scrollbar cho công thức dài */}
                                                    <div 
                                                        className="text-sm text-gray-600 whitespace-pre-line leading-relaxed max-h-[40vh] overflow-y-auto pr-2"
                                                        dangerouslySetInnerHTML={{ __html: recipe.instruction }}
                                                    />
                                                </div>
                                            </div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         )}

                         <div className="flex items-end gap-3 mb-6">
                            <span className="text-3xl font-extrabold text-brand-orange">
                               {currentVariant ? formatCurrency(currentVariant.price) : 'Liên hệ'}
                            </span>
                            {currentVariant?.original_price > currentVariant?.price && (
                               <span className="text-lg text-gray-400 line-through mb-1">
                                  {formatCurrency(currentVariant.original_price)}
                               </span>
                            )}
                         </div>

                         <button 
                            onClick={() => currentVariant && addToCart(product, currentVariant)}
                            disabled={!currentVariant || currentVariant.stock_quantity <= 0}
                            className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed mt-auto"
                         >
                            <ShoppingCart className="w-5 h-5" />
                            {currentVariant?.stock_quantity > 0 ? 'THÊM VÀO GIỎ' : 'TẠM HẾT HÀNG'}
                         </button>
                      </div>
                   </div>
                </div>
                
                {/* --- KHỐI MÔ TẢ & ĐÁNH GIÁ --- */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                   <h3 className="font-bold text-xl text-gray-800 mb-4 border-b pb-2">Mô tả sản phẩm</h3>
                   <div className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                       {product.description || "Đang cập nhật mô tả..."}
                   </div>

                   {/* --- KHỐI HDSD ĐƯỢC DỜI XUỐNG ĐÂY --- */}
                   {product.usage_instruction && (
                       <div className="mb-10 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                           <h3 className="font-bold text-brand-blue mb-3 flex items-center gap-2">
                               📖 Hướng dẫn sử dụng & Bảo quản
                           </h3>
                           <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                               {product.usage_instruction}
                           </div>
                       </div>
                   )}

                   <h3 className="font-bold text-xl text-gray-800 mb-6 flex justify-between items-center border-t pt-6">
                       Đánh giá & Nhận xét
                       <span className="text-sm font-normal text-gray-500">{reviews.length} lượt</span>
                   </h3>

                   {user ? (
                       <form onSubmit={handleSubmitReview} className="mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                           <h4 className="font-bold text-gray-700 mb-3">Viết đánh giá của bạn</h4>
                           <div className="flex gap-2 mb-4">
                               {[1, 2, 3, 4, 5].map((star) => (
                                   <button 
                                       key={star} type="button" onClick={() => setRating(star)}
                                       className={`transition hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                   >
                                       <Star className="w-6 h-6 fill-current" />
                                   </button>
                               ))}
                           </div>
                           <textarea 
                               className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-brand-orange mb-3"
                               rows={3} placeholder="Sản phẩm thế nào? Chia sẻ cảm nhận của bạn..."
                               value={comment} onChange={(e) => setComment(e.target.value)} required
                           />
                           <button type="submit" disabled={submittingReview} className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition">
                               {submittingReview ? 'Đang gửi...' : 'Gửi đánh giá'}
                           </button>
                       </form>
                   ) : (
                       <div className="mb-8 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm text-center border border-yellow-100">
                           Vui lòng <Link href="/dangnhap" className="font-bold underline">đăng nhập</Link> để viết đánh giá.
                       </div>
                   )}

                   <div className="space-y-6">
                       {reviews.length === 0 ? (
                           <p className="text-gray-500 text-center py-4 italic">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                       ) : (
                           reviews.map((review) => (
                               <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                   <div className="flex items-center gap-3 mb-2">
                                       <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                                           {review.user?.avatar_url ? <img src={review.user.avatar_url} className="w-full h-full object-cover"/> : <User className="w-5 h-5"/>}
                                       </div>
                                       <div>
                                           <p className="font-bold text-gray-800 text-sm">{review.user?.full_name || "Khách hàng"}</p>
                                           <div className="flex text-yellow-400 text-xs gap-0.5">
                                               {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 fill-current ${i < review.rating ? '' : 'text-gray-200'}`} />)}
                                           </div>
                                       </div>
                                       <span className="ml-auto text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString('vi-VN')}</span>
                                   </div>
                                   <p className="text-gray-600 text-sm pl-13 ml-13 leading-relaxed">{review.comment}</p>
                               </div>
                           ))
                       )}
                   </div>
                </div>
            </div>

            {/* Cột phải: Chiếm 1/4 */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    {/* BUNDLE */}
                    {containingBundles.length > 0 && (
                        <div className="mb-8">
                             <h3 className="font-bold text-lg text-gray-800 mb-4 border-l-4 border-red-500 pl-3 flex items-center gap-2">
                                🔥 Mua Combo rẻ hơn
                             </h3>
                             <div className="space-y-3">
                                {containingBundles.map(bundle => (
                                    <MiniBundleCard key={bundle.id} bundle={bundle} />
                                ))}
                             </div>
                        </div>
                    )}

                    {/* SẢN PHẨM LIÊN QUAN */}
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-4 border-l-4 border-brand-orange pl-3">
                            Sản phẩm liên quan
                        </h3>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                            {relatedProducts.length === 0 ? (
                                <p className="text-gray-500 text-sm text-center py-4 bg-white rounded-xl border border-gray-100">
                                    Không có sản phẩm tương tự.
                                </p>
                            ) : (
                                relatedProducts.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}