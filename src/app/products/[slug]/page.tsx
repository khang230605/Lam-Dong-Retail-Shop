'use client';

import { useEffect, useState, use } from 'react';
import { ProductService } from '@/services/ProductService';
import { ReviewService } from '@/services/ReviewService';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { ShoppingCart, Clock, ShieldCheck, Star, User, Loader2, ArrowRight } from 'lucide-react'; // Thêm ArrowRight
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/utils/supabase';
import { BundleService } from '@/services/BundleService';
import MiniBundleCard from '@/components/MiniBundleCard';

// 1. Sửa hàm xử lý ảnh: Chấp nhận null/undefined để tránh lỗi
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
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        <div className="text-sm text-gray-500 mb-6">
           <Link href="/">Trang chủ</Link> / <Link href="/products">Sản phẩm</Link> / <span className="text-gray-800 font-bold">{product.name}</span>
        </div>

        {/* 2. THAY ĐỔI LAYOUT Ở ĐÂY: 
            Dùng grid-cols-4 thay vì grid-cols-3 để chia tỷ lệ 75% - 25% 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Cột chính: Chiếm 3/4 (75%) -> Rộng hơn, lấp đầy khoảng trống */}
            <div className="lg:col-span-3 space-y-8">
                {/* --- KHỐI CHI TIẾT SẢN PHẨM --- */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                      {/* ẢNH */}
                      <div className="p-8 flex items-center justify-center bg-gray-50 relative min-h-[300px]">
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
                      <div className="p-8 flex flex-col">
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
                         
                         {/* SWITCHER SMART CHOICE: Chỉ hiện khi có hàng cận date */}
                            {nearDateVariant && (
                                <div className={`mb-6 p-4 border rounded-xl flex items-center justify-between transition-colors duration-300 ${isSmartChoiceEnabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                    <div className="flex-1">
                                        <h3 className={`font-bold flex items-center gap-2 ${isSmartChoiceEnabled ? 'text-green-800' : 'text-gray-800'}`}>
                                            {isSmartChoiceEnabled ? <Clock className="w-4 h-4"/> : <ShieldCheck className="w-4 h-4"/>}
                                            Smart Choice {isSmartChoiceEnabled ? '(Đã bật)' : ''}
                                        </h3>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {isSmartChoiceEnabled ? (
                                                <span>
                                                    Hạn dùng: <b>{new Date(nearDateVariant.expiry_date).toLocaleDateString('vi-VN')}</b>
                                                    <br/>
                                                    Giá sốc: <b className="text-brand-orange text-base">{formatCurrency(nearDateVariant.price)}</b>
                                                </span>
                                            ) : (
                                                "Bật để chọn hàng dùng ngay với giá ưu đãi hơn."
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleToggleSmartChoice}
                                        /* Không cần disable nữa vì nếu không có nearDateVariant thì khối này đã ẩn rồi */
                                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0 ${
                                            isSmartChoiceEnabled ? 'bg-green-500' : 'bg-gray-300'
                                        } cursor-pointer`}
                                    >
                                        <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${isSmartChoiceEnabled ? 'transform translate-x-6' : ''}`} />
                                    </button>
                                </div>
                            )}

                            {/* --- DI CHUYỂN HƯỚNG DẪN SỬ DỤNG LÊN ĐÂY --- */}
                         {/* Chỉ hiện hướng dẫn sử dụng khi BẬT Smart Choice */}
                         {product.usage_instruction && isSmartChoiceEnabled && (
                             <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300 text-sm">
                                 <h3 className="font-bold text-brand-blue mb-2 flex items-center gap-2">
                                     📖 Hướng dẫn sử dụng & Bảo quản
                                 </h3>
                                 <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                     {product.usage_instruction}
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

            {/* Cột phải: Chiếm 1/4 (25%) -> Gọn gàng bên phải */}
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
                    {/* 3. XÓA các class w-[55%] đi, để nó tự fill hết cột 25% là vừa đẹp */}
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