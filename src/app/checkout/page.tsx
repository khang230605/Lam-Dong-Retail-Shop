'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { OrderService } from '@/services/OrderService';
import { formatCurrency } from '@/utils/format';
import { supabase } from '@/utils/supabase';
import { Loader2, MapPin, Phone, User, CreditCard, Banknote } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  // State mới: Đánh dấu là đã đặt hàng thành công
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setFormData(prev => ({...prev, fullName: user.user_metadata.full_name}));
      }
    };
    loadUserInfo();
  }, []);

  // SỬA LỖI Ở ĐÂY: Thêm điều kiện !isSuccess
  // Chỉ đá về trang chủ nếu giỏ hàng trống VÀ chưa đặt hàng thành công
  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      router.push('/');
    }
  }, [items, router, isSuccess]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Tạo đơn hàng
      await OrderService.createOrder({
        ...formData,
        totalPrice: totalPrice
      }, items);

      // 2. Đánh dấu là thành công TRƯỚC khi xóa giỏ hàng
      // Để chặn cái useEffect phía trên không chạy
      setIsSuccess(true); 

      // 3. Xóa giỏ hàng
      clearCart(); 

      // 4. Chuyển hướng
      // (Bỏ alert đi cho trải nghiệm mượt hơn, sang trang kia cảm ơn sau)
      router.push('/thank-you'); 

    } catch (error: any) {
      alert("Có lỗi xảy ra: " + error.message);
      setIsSuccess(false); // Reset nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  // ... (Phần return giao diện giữ nguyên không đổi) ...
  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-blue mb-8 text-center">Thanh Toán Đơn Hàng</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Box 1: Địa chỉ */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="text-brand-orange" /> Địa chỉ nhận hàng
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="text" 
                      className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
                      placeholder="Nhập tên người nhận"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="tel" 
                      className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
                      placeholder="VD: 0912..."
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-bold text-gray-700 mb-1">Địa chỉ chi tiết</label>
                 <input 
                    required
                    type="text" 
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
                    placeholder="Số nhà, tên đường, phường/xã..."
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                 />
              </div>

              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Ghi chú (Tùy chọn)</label>
                 <textarea 
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange h-24"
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                 />
              </div>
            </div>

            {/* Box 2: Phương thức thanh toán */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="text-brand-orange" /> Phương thức thanh toán
              </h2>
              
              <div className="space-y-3">
                 <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${formData.paymentMethod === 'cod' ? 'border-brand-orange bg-orange-50' : 'border-gray-200'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={formData.paymentMethod === 'cod'}
                      onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-5 h-5 text-brand-orange focus:ring-brand-orange"
                    />
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <Banknote className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-800">Thanh toán khi nhận hàng (COD)</p>
                          <p className="text-xs text-gray-500">Bạn chỉ phải thanh toán khi đã nhận được hàng</p>
                       </div>
                    </div>
                 </label>

                 <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl opacity-50 cursor-not-allowed">
                    <input type="radio" name="payment" disabled />
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-800">Chuyển khoản ngân hàng (QR Code)</p>
                          <p className="text-xs text-gray-500">Đang bảo trì / Sắp ra mắt</p>
                       </div>
                    </div>
                 </label>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="font-bold text-gray-800 mb-4 pb-4 border-b">Đơn hàng của bạn</h3>
                
                {/* List item nhỏ gọn */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                {items.map((item, index) => {
                    // LOGIC MỚI: Kiểm tra xem là Bundle hay Product
                    if (item.type === 'bundle') {
                        // GIAO DIỆN CHO BUNDLE
                        return (
                            <div key={`bundle-${index}`} className="flex justify-between text-sm border-b border-dashed pb-2 last:border-0">
                            <div>
                                <p className="font-bold text-brand-orange line-clamp-1">
                                    🎁 {item.bundle.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    SL: {item.quantity} (Combo tiết kiệm)
                                </p>
                            </div>
                            <p className="font-bold text-gray-700">
                                {formatCurrency(item.bundle.price * item.quantity)}
                            </p>
                            </div>
                        );
                    } else {
                        // GIAO DIỆN CHO SẢN PHẨM THƯỜNG (Giữ nguyên logic cũ)
                        return (
                            <div key={`prod-${index}`} className="flex justify-between text-sm border-b border-dashed pb-2 last:border-0">
                            <div>
                                <p className="font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                                <p className="text-gray-500 text-xs">
                                    SL: {item.quantity} x {item.variant.type === 'near_date' ? 'Cận date' : 'Mới'}
                                </p>
                            </div>
                            <p className="font-bold text-gray-700">
                                {formatCurrency(item.variant.price * item.quantity)}
                            </p>
                            </div>
                        );
                    }
                })}
                </div>

                <div className="space-y-2 text-sm text-gray-600 border-t pt-4 mb-4">
                   <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>{formatCurrency(totalPrice)}</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Phí vận chuyển</span>
                      <span className="text-green-600 font-bold">Miễn phí</span>
                   </div>
                </div>

                <div className="flex justify-between items-center border-t pt-4 mb-6">
                   <span className="font-bold text-lg text-gray-800">Tổng cộng</span>
                   <span className="font-extrabold text-2xl text-brand-orange">{formatCurrency(totalPrice)}</span>
                </div>

                <button 
                   type="submit"
                   disabled={loading}
                   className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                   {loading ? <Loader2 className="animate-spin" /> : 'ĐẶT HÀNG NGAY'}
                </button>
             </div>
          </div>

        </form>
      </div>
    </main>
  );
}