'use client';

import { useEffect, useState, use } from 'react';
import { supabase } from '@/utils/supabase';
import { formatCurrency } from '@/utils/format';
import { Loader2, ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Hàm xử lý ảnh y chang trang Profile / Giỏ hàng
const getImageUrl = (path: string | null | undefined) => {
  if (!path) return "https://placehold.co/100?text=No+Image";
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // 1. Lấy thông tin chung của đơn hàng
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single();
        
        if (orderError) throw orderError;

        if (orderData) {
          setOrder(orderData);
          setStatus(orderData.status || 'pending');
        }

        // 2. Lấy chi tiết món dùng CÚ PHÁP CHUẨN từ trang Profile của bạn
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            *,
            variant:product_variants (
               product:products ( name, image_url ) 
            ),
            bundle:bundles ( name, image_url )
          `)
          .eq('order_id', id);

        if (itemsError) {
          console.error("Lỗi tải chi tiết món:", itemsError);
        } else if (itemsData) {
          setOrderItems(itemsData);
        }

      } catch (error) {
        console.error("Lỗi tổng thể trang chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

const handleUpdateStatus = async () => {
    setUpdating(true);
    setSuccessMsg('');

    // 1. Ép kiểu id từ Chuỗi trên URL sang Số nguyên
    const orderId = Number(id);

    const { data, error } = await supabase
      .from('orders')
      .update({ status: status })
      .eq('id', orderId)
      .select(); // Thêm .select() để bắt Supabase trả về dòng vừa update

    setUpdating(false);

    if (error) {
      console.error("Lỗi cập nhật Supabase:", error);
      alert(`Có lỗi xảy ra: ${error.message}`);
    } else if (data && data.length === 0) {
      // Nếu update thành công nhưng trả về 0 dòng -> Chắc chắn do lỗi quyền RLS
      alert('Không lưu được! Bảng orders đang bị khóa quyền UPDATE (RLS). Bạn cần vào Supabase mở quyền.');
    } else {
      setSuccessMsg('Cập nhật trạng thái thành công!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-orange w-8 h-8" /></div>;
  if (!order) return <div className="text-center py-20 text-gray-500 font-medium">Không tìm thấy đơn hàng này.</div>;

  const customerName = order.name || order.full_name || order.customer_name || 'Khách hàng';
  const customerPhone = order.phone || order.phone_number || 'Chưa cập nhật';

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/orders" className="inline-flex items-center text-gray-500 hover:text-brand-orange mb-6 font-medium transition">
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Chi tiết đơn hàng #{String(order.id).split('-')[0]}</h1>
          <p className="text-gray-500 text-sm mt-1">Đặt lúc: {new Date(order.created_at).toLocaleString('vi-VN')}</p>
        </div>

        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-none bg-gray-50 outline-none text-sm font-bold text-gray-700 py-2 px-3 rounded-lg cursor-pointer"
          >
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang chuẩn bị</option>
            <option value="shipped">Đang giao</option>
            <option value="delivered">Đã giao (Hoàn thành)</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <button 
            onClick={handleUpdateStatus}
            disabled={updating || status === order.status}
            className="bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Lưu
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 font-medium border border-green-100 animate-fade-in">
          <CheckCircle2 className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Thông tin khách hàng</h3>
          <div className="space-y-3 text-sm">
            <p><span className="text-gray-500">Tên:</span> <br/><span className="font-bold text-gray-800 text-base">{customerName}</span></p>
            <p><span className="text-gray-500">Điện thoại:</span> <br/><span className="font-bold text-gray-800">{customerPhone}</span></p>
            <p><span className="text-gray-500">Địa chỉ:</span> <br/><span className="text-gray-800 leading-relaxed">{order.address || 'Không có địa chỉ'}</span></p>
            {order.note && (
                <p><span className="text-gray-500">Ghi chú:</span> <br/><span className="text-red-500 italic">{order.note}</span></p>
            )}
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Sản phẩm đã đặt</h3>
          
          <div className="space-y-4 mb-6">
            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Không tìm thấy chi tiết món trong đơn hàng này.</p>
            ) : (
              orderItems.map((item, idx) => {
                
                // Logic lấy ảnh và tên cực chuẩn y hệt trang Profile
                const imgPath = item.bundle?.image_url || item.variant?.product?.image_url || item.image_url;
                const displayName = item.product_name || item.bundle?.name || item.variant?.product?.name || "Sản phẩm";

                return (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1 border border-gray-100 flex-shrink-0 overflow-hidden">
                      <img 
                        src={getImageUrl(imgPath)} 
                        alt={displayName} 
                        className="w-full h-full object-cover rounded" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-sm">{displayName}</p>
                      <p className="text-gray-500 text-xs mt-1">Số lượng: <span className="font-bold text-gray-700">x{item.quantity}</span></p>
                    </div>
                    <div className="font-bold text-brand-orange">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Tổng thanh toán:</span>
            <span className="text-2xl font-extrabold text-brand-orange">{formatCurrency(order.total_amount || order.total_price || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}