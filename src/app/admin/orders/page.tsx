'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { formatCurrency } from '@/utils/format';
import Link from 'next/link';
import { Loader2, Eye, Search } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    // Giả định bảng đơn hàng của bạn tên là 'orders'
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  // Hàm helper để render màu trạng thái cho đẹp
  const getStatusBadge = (status: string) => {
    // Tạo 1 biến class dùng chung để code gọn hơn
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap inline-block text-center";
    
    switch (status) {
      case 'pending': return <span className={`bg-yellow-100 text-yellow-700 ${baseClasses}`}>Chờ xử lý</span>;
      case 'processing': return <span className={`bg-blue-100 text-blue-700 ${baseClasses}`}>Đang chuẩn bị</span>;
      case 'shipped': return <span className={`bg-purple-100 text-purple-700 ${baseClasses}`}>Đang giao</span>;
      case 'delivered': return <span className={`bg-green-100 text-green-700 ${baseClasses}`}>Đã giao</span>;
      case 'cancelled': return <span className={`bg-red-100 text-red-700 ${baseClasses}`}>Đã hủy</span>;
      default: return <span className={`bg-gray-100 text-gray-700 ${baseClasses}`}>{status}</span>;
    }
  };

  // Lọc đơn hàng theo tên hoặc số điện thoại khách
  const filteredOrders = orders.filter(o => 
    (o.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (o.phone || '').includes(searchTerm)
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Quản lý Đơn hàng</h1>
          <p className="text-gray-500 text-sm mt-1">Theo dõi và cập nhật trạng thái đơn hàng.</p>
        </div>

        {/* Ô Tìm kiếm */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Tìm tên hoặc SĐT..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-brand-orange text-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-orange w-8 h-8" /></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-semibold">Mã ĐH</th>
                  <th className="p-4 font-semibold">Khách hàng</th>
                  <th className="p-4 font-semibold">Ngày đặt</th>
                  <th className="p-4 font-semibold">Tổng tiền</th>
                  <th className="p-4 font-semibold">Trạng thái</th>
                  <th className="p-4 font-semibold text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredOrders.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">Không tìm thấy đơn hàng nào.</td></tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 font-mono text-sm font-bold text-gray-600 whitespace-nowrap">
                        #{String(order.id).split('-')[0]}
                      </td>
                      <td className="p-4 min-w-[150px]"> {/* Ép độ rộng tối thiểu cho tên khách để không bị quá hẹp */}
                        <p className="font-bold text-gray-800">{order.full_name}</p>
                        <p className="text-gray-500 text-xs">{order.phone}</p>
                      </td>
                      <td className="p-4 text-gray-600 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="p-4 font-bold text-brand-orange whitespace-nowrap">
                        {formatCurrency(order.total_price || 0)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue px-3 py-1.5 rounded-lg hover:bg-blue-100 transition font-medium text-xs whitespace-nowrap"
                        >
                          <Eye className="w-4 h-4" /> Xem
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}