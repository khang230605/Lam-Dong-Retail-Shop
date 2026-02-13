'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { formatCurrency } from '@/utils/format';
import { Package, User, LogOut, Loader2, MapPin, Clock } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Lấy thông tin User
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/dangnhap'); // Chưa đăng nhập thì đá về
        return;
      }
      setUser(user);

      // 2. Lấy danh sách đơn hàng của User này (sắp xếp mới nhất lên đầu)
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
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
    // 1. Refresh để Header nhận biết sự kiện SIGNED_OUT nhanh hơn
    router.refresh(); 
    // 2. Đá về trang chủ
    router.push('/');
  };

  // Helper: Màu sắc trạng thái đơn hàng
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

  // Helper: Dịch trạng thái sang tiếng Việt
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-orange"/></div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                   {(user.user_metadata?.full_name || user.email)?.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-bold text-xl text-gray-800">
                   {user.user_metadata?.full_name || "Khách hàng"}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              <div className="space-y-2">
                 <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-brand-blue rounded-xl font-bold">
                    <Package className="w-5 h-5" /> Đơn hàng của tôi
                 </button>
                 {/* <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
                    <User className="w-5 h-5" /> Thông tin tài khoản
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
                    <MapPin className="w-5 h-5" /> Sổ địa chỉ
                 </button> */}
                 <hr className="my-2"/>
                 <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-bold"
                 >
                    <LogOut className="w-5 h-5" /> Đăng xuất
                 </button>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: LỊCH SỬ ĐƠN HÀNG */}
          <div className="lg:col-span-3">
             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
               <Clock className="text-brand-orange" /> Lịch sử đơn hàng
             </h2>

             {orders.length === 0 ? (
               <div className="bg-white p-12 rounded-2xl text-center border border-gray-100">
                  <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào.</p>
                  <button onClick={() => router.push('/')} className="bg-brand-orange text-white px-6 py-2 rounded-full font-bold">
                    Mua sắm ngay
                  </button>
               </div>
             ) : (
               <div className="space-y-6">
                 {orders.map((order) => (
                   <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      
                      {/* Header đơn hàng */}
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                         <div>
                            <span className="font-bold text-gray-700">Đơn hàng #{order.id}</span>
                            <span className="text-sm text-gray-500 mx-2">|</span>
                            <span className="text-sm text-gray-500">
                               {new Date(order.created_at).toLocaleDateString('vi-VN')} {new Date(order.created_at).toLocaleTimeString('vi-VN')}
                            </span>
                         </div>
                         <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                         </div>
                      </div>

                      {/* Danh sách sản phẩm trong đơn */}
                      <div className="p-6">
                         {order.items.map((item: any) => (
                           <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0 border-gray-50">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">IMG</div>
                                 <div>
                                    <p className="font-medium text-gray-800">{item.product_name}</p>
                                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                                 </div>
                              </div>
                              <div className="font-bold text-gray-700">
                                 {formatCurrency(item.price * item.quantity)}
                              </div>
                           </div>
                         ))}
                      </div>

                      {/* Footer đơn hàng */}
                      <div className="px-6 py-4 bg-gray-50/50 flex justify-between items-center">
                         <div className="text-sm text-gray-500">
                            Thanh toán: {order.payment_method === 'cod' ? 'Tiền mặt khi nhận hàng' : 'Chuyển khoản'}
                         </div>
                         <div className="text-right">
                            <span className="text-sm text-gray-600 mr-2">Tổng tiền:</span>
                            <span className="text-xl font-extrabold text-brand-orange">
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