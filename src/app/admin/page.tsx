'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Package, ShoppingCart, Users, Clock, Eye, Loader2 } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // 1. Đếm tổng sản phẩm
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        // 2. Đếm tổng số khách hàng (role = customer)
        const { count: customersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'customer');

        // 3. Đếm tổng số đơn hàng (Giả sử bạn có bảng orders)
        // Bọc try/catch phụ để không sập trang nếu chưa tạo bảng orders
        let ordersCount = 0;
        let pendingCount = 0;
        try {
            const { count: oCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
            const { count: pCount } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending');
            ordersCount = oCount || 0;
            pendingCount = pCount || 0;
        } catch (e) {
            console.log("Chưa có bảng orders");
        }

        setStats({
          totalProducts: productsCount || 0,
          totalCustomers: customersCount || 0,
          totalOrders: ordersCount,
          pendingOrders: pendingCount
        });
      } catch (error) {
        console.error('Lỗi tải thống kê:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Tổng quan hệ thống</h1>
          <p className="text-gray-500 mt-2">Theo dõi các chỉ số hoạt động kinh doanh B2B của bạn hôm nay.</p>
      </div>
      
      {loading ? (
          <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Thẻ 1: Tổng sản phẩm */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
               <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-8 h-8" />
               </div>
               <div>
                  <p className="text-gray-500 font-medium mb-1">Tổng sản phẩm trong shop</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
               </div>
            </div>

            {/* Thẻ 2: Khách hàng */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
               <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8" />
               </div>
               <div>
                  <p className="text-gray-500 font-medium mb-1">Tài khoản Customer</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers}</p>
               </div>
            </div>

            {/* Thẻ 4: Tổng đơn hàng */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
               <div className="w-16 h-16 bg-orange-50 text-brand-orange rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-8 h-8" />
               </div>
               <div>
                  <p className="text-gray-500 font-medium mb-1">Tổng đơn hàng</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
               </div>
            </div>

            {/* Thẻ 5: Đơn chờ xử lý */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-red-100 flex items-center gap-6">
               <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8" />
               </div>
               <div>
                  <p className="text-red-500 font-medium mb-1">Đơn chờ xử lý</p>
                  <p className="text-3xl font-bold text-red-600">{stats.pendingOrders}</p>
               </div>
            </div>

          </div>
      )}
    </div>
  );
}