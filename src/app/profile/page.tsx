'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { formatCurrency } from '@/utils/format';
import { Package, User, LogOut, Loader2, Clock, Leaf, Award } from 'lucide-react';

const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://placehold.co/100?text=IMG";
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/dangnhap'); 
        return;
      }
      setUser(user);

      // --- SỬA QUERY: Lấy thêm original_price của bundles ---
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items (
            *,
            variant:product_variants (
               *,
               product:products ( image_url ) 
            ),
            bundle:bundles ( image_url, name, original_price ) 
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error) {
        setOrders(ordersData || []);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); 
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shipping': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    const map: any = {
      pending: 'Chờ xử lý',
      processing: 'Đang chuẩn bị',
      shipping: 'Đang giao hàng',
      delivered: 'Giao thành công',
      cancelled: 'Đã hủy'
    };
    return map[status] || status;
  };

  // ==========================================
  // LOGIC TÍNH TOÁN: CỘNG GỘP SẢN PHẨM LẺ VÀ BUNDLE
  // ==========================================
  const totalSavings = orders.reduce((acc, order) => {
    // Không tính tiền tiết kiệm cho những đơn đã bị hủy
    if (order.status === 'cancelled') return acc;
    
    const orderSavings = order.items.reduce((sum: number, item: any) => {
      // Ưu tiên lấy giá gốc của Bundle (nếu mua theo combo), không thì lấy giá gốc của Variant (sản phẩm lẻ)
      const origPrice = item.bundle ? item.bundle.original_price : item.variant?.original_price;
      
      // Nếu có giá gốc và giá gốc > giá thực tế mua
      if (origPrice && origPrice > item.price) {
         return sum + ((origPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
    
    return acc + orderSavings;
  }, 0);

  // Thiết lập các mốc điểm (Milestones)
  const maxMilestone = 500000;
  const milestones = [
    { value: 0, label: '0đ' },
    { value: 50000, label: '50K' },
    { value: 150000, label: '150K' },
    { value: 300000, label: '300K' },
    { value: 500000, label: '500K' }
  ];
  const progressWidth = Math.min((totalSavings / maxMilestone) * 100, 100);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-orange"/></div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg shadow-orange-100">
                   {(user.user_metadata?.full_name || user.email)?.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-bold text-xl text-gray-800">
                   {user.user_metadata?.full_name || "Khách hàng"}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              <div className="space-y-2">
                 <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-brand-blue rounded-xl font-bold border border-blue-100 transition">
                    <Package className="w-5 h-5" /> Đơn hàng của tôi
                 </button>
                 <hr className="my-2 border-gray-100"/>
                 <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-bold"
                 >
                    <LogOut className="w-5 h-5" /> Đăng xuất
                 </button>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: THỐNG KÊ & LỊCH SỬ ĐƠN HÀNG */}
          <div className="lg:col-span-3">
             
             {/* BẢNG THỐNG KÊ SMART-SAVER */}
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-green-100 mb-8 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-5 pointer-events-none transform rotate-12">
                   <Leaf className="w-40 h-40 text-green-600" />
                </div>

                <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-2 flex items-center gap-2 relative z-10">
                   <Award className="text-brand-orange w-6 h-6" /> Thành tích Smart-Saver
                </h2>
                <p className="text-gray-500 text-sm mb-6 relative z-10">Số tiền bạn đã tiết kiệm được cùng LAMDO:</p>
                
                <div className="text-3xl md:text-4xl font-extrabold text-green-600 mb-10 relative z-10">
                   {formatCurrency(totalSavings)}
                </div>

                {/* THANH TIẾN TRÌNH */}
                <div className="relative w-full h-2.5 md:h-3 bg-gray-100 rounded-full mb-12 mx-auto max-w-3xl border border-gray-200 shadow-inner">
                   <div 
                     className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                     style={{ width: `${progressWidth}%` }}
                   ></div>

                   {milestones.map((m, i) => {
                      const isReached = totalSavings >= m.value;
                      const isCurrentMax = totalSavings >= m.value && (i === milestones.length - 1 || totalSavings < milestones[i+1].value);
                      const leftPos = (m.value / maxMilestone) * 100;
                      
                      return (
                        <div 
                           key={i} 
                           className="absolute top-1/2 flex flex-col items-center" 
                           style={{ left: `${leftPos}%`, transform: 'translate(-50%, -50%)' }}
                        >
                           <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-4 z-10 transition-colors duration-500 shadow-sm ${
                             isReached ? 'bg-white border-green-500' : 'bg-gray-100 border-white'
                           } ${isCurrentMax && m.value > 0 ? 'scale-125 shadow-green-200 shadow-lg' : ''}`}></div>
                           
                           <span className={`absolute top-6 text-[10px] md:text-xs font-bold whitespace-nowrap ${
                             isReached ? 'text-green-700' : 'text-gray-400'
                           }`}>
                             {m.label}
                           </span>
                        </div>
                      )
                   })}
                </div>

                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 flex items-start gap-3 relative z-10">
                   <div className="bg-green-100 p-2 rounded-full text-green-600 flex-shrink-0 mt-0.5">
                     <Leaf className="w-4 h-4" />
                   </div>
                   <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      Hãy tiếp tục sử dụng tính năng <b className="text-brand-orange">Smart-Saver</b> và duy trì Giỏ hàng để tối ưu chi phí sinh hoạt mỗi tháng, đồng thời chung tay cùng <b className="text-brand-blue">LAMDO</b> bảo vệ môi trường nhé! 🌍
                   </p>
                </div>
             </div>

             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
               <Clock className="text-brand-blue" /> Lịch sử đơn hàng
             </h2>

             {orders.length === 0 ? (
               <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Package className="w-10 h-10" />
                  </div>
                  <p className="text-gray-500 mb-6 font-medium">Bạn chưa có đơn hàng nào.</p>
                  <button onClick={() => router.push('/')} className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-100">
                    Mua sắm ngay
                  </button>
               </div>
             ) : (
               <div className="space-y-6">
                 {orders.map((order) => (
                   <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-brand-orange/30 transition duration-300">
                      
                      <div className="bg-gray-50/50 px-4 md:px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                         <div>
                            <span className="font-bold text-gray-800">Đơn hàng #{String(order.id).split('-')[0]}</span>
                            <span className="text-sm text-gray-400 mx-2">|</span>
                            <span className="text-sm text-gray-500">
                               {new Date(order.created_at).toLocaleDateString('vi-VN')} {new Date(order.created_at).toLocaleTimeString('vi-VN')}
                            </span>
                         </div>
                         <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                         </div>
                      </div>

                      <div className="p-4 md:p-6">
                         {order.items.map((item: any) => {
                           const imgPath = item.bundle?.image_url || item.variant?.product?.image_url;
                           const displayName = item.product_name || item.bundle?.name || "Sản phẩm";
                           
                           // --- LOGIC HIỂN THỊ GIÁ GẠCH NGANG CŨNG ÁP DỤNG CHO CẢ BUNDLE ---
                           const origPrice = item.bundle ? item.bundle.original_price : item.variant?.original_price;
                           const isDiscounted = origPrice && origPrice > item.price;

                           return (
                             <div key={item.id} className="flex justify-between items-center py-3 border-b border-dashed last:border-0 border-gray-100">
                                <div className="flex items-center gap-4">
                                   <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0 p-1">
                                      <img 
                                        src={getImageUrl(imgPath)} 
                                        alt={displayName}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                      />
                                   </div>
                                   <div>
                                      <p className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight mb-1">{displayName}</p>
                                      <p className="text-xs font-medium text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">SL: x{item.quantity}</p>
                                   </div>
                                </div>
                                
                                <div className="text-right whitespace-nowrap ml-4 flex flex-col justify-end h-full">
                                   {isDiscounted ? (
                                      <>
                                        <div className="text-xs text-gray-400 line-through mb-0.5 font-medium">
                                           {formatCurrency(origPrice * item.quantity)}
                                        </div>
                                        <div className="font-bold text-brand-orange text-sm md:text-base">
                                           {formatCurrency(item.price * item.quantity)}
                                        </div>
                                      </>
                                   ) : (
                                      <div className="font-bold text-gray-800 text-sm md:text-base">
                                         {formatCurrency(item.price * item.quantity)}
                                      </div>
                                   )}
                                </div>
                             </div>
                           );
                         })}
                      </div>

                      <div className="px-4 md:px-6 py-4 bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                         <div className="text-sm text-gray-500 font-medium">
                            <span className="hidden md:inline">Phương thức thanh toán: </span> 
                            <span className="text-gray-700">{order.payment_method === 'cod' ? 'Thanh toán tiền mặt' : 'Chuyển khoản'}</span>
                         </div>
                         <div className="text-right">
                            <span className="text-sm text-gray-500 mr-2">Thành tiền:</span>
                            <span className="text-xl md:text-2xl font-extrabold text-brand-orange">
                               {formatCurrency(order.total_price)}
                            </span>
                         </div>
                      </div>

                   </div>
                 ))}
               </div>
             )}
          </div>

        </div>
      </div>
    </main>
  );
}