'use client'; 

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, LogOut, Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // --- THÊM STATE ĐỂ CHỨA TÊN ADMIN ---
  const [adminName, setAdminName] = useState('Admin');
  const [loadingName, setLoadingName] = useState(true);

  // Lấy tên Admin ngay khi mở trang
  useEffect(() => {
    const getAdminProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Lấy full_name từ metadata (lúc đăng ký Google) hoặc email
        const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin';
        
        // Cắt lấy tên cuối cùng cho gọn (VD: "Trần Văn Khang" -> "Khang")
        const nameParts = displayName.split(' ');
        const shortName = nameParts[nameParts.length - 1];
        
        setAdminName(shortName);
      }
      setLoadingName(false);
    };

    getAdminProfile();
  }, []);

  const isDashboard = pathname === '/admin';
  const isOrders = pathname.startsWith('/admin/orders');

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    router.push('/admin');
    // setTimeout(() => { window.location.reload(); }, 100);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pb-16 md:pb-0">
        
        {/* --- MOBILE TOP HEADER --- */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-40">
          <h2 className="text-xl font-extrabold text-brand-blue flex items-center gap-2">
            <span className="bg-brand-orange text-white p-1 rounded-lg text-xs">LAMDO</span>
            {/* Hiển thị tên Admin */}
            {loadingName ? <Loader2 className="w-4 h-4 animate-spin text-gray-400" /> : adminName}
          </h2>
          <Link href="/" className="text-gray-500 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>

        {/* --- SIDEBAR (PC) / BOTTOM BAR (MOBILE) --- */}
        <aside className="
          fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center px-2 py-1
          md:sticky md:top-0 md:w-64 md:h-screen md:border-r md:border-t-0 md:flex-col md:justify-start md:px-0 md:py-0 md:z-auto
        ">
          <div className="hidden md:block p-6 border-b border-gray-100 w-full">
            <h2 className="text-2xl font-extrabold text-brand-blue flex items-center gap-2">
              <span className="bg-brand-orange text-white p-1.5 rounded-lg text-sm">LAMDO</span>
              {/* Hiển thị tên Admin */}
              {loadingName ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : adminName}
            </h2>
          </div>
          
          <nav className="flex flex-row w-full justify-around md:flex-col md:flex-1 md:p-4 md:space-y-2 md:overflow-y-auto md:justify-start">
            
            {/* --- MỤC TỔNG QUAN --- */}
            <a 
              href="/admin" 
              onClick={handleDashboardClick}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 p-2 md:px-4 md:py-3 md:rounded-xl md:border transition flex-1 md:flex-none cursor-pointer ${
                isDashboard 
                  ? 'text-brand-orange md:bg-orange-50 font-bold md:border-orange-100' 
                  : 'text-gray-500 hover:text-brand-orange md:hover:bg-orange-50 font-medium md:border-transparent'
              }`}
            >
              <LayoutDashboard className="w-6 h-6 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-base">Tổng quan</span>
            </a>
            
            {/* --- MỤC ĐƠN HÀNG --- */}
            <Link 
              href="/admin/orders" 
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 p-2 md:px-4 md:py-3 md:rounded-xl md:border transition flex-1 md:flex-none ${
                isOrders 
                  ? 'text-brand-orange md:bg-orange-50 font-bold md:border-orange-100' 
                  : 'text-gray-500 hover:text-brand-orange md:hover:bg-orange-50 font-medium md:border-transparent'
              }`}
            >
              <ShoppingCart className="w-6 h-6 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-base">Đơn hàng</span>
            </Link>

          </nav>
          
          <div className="hidden md:block w-full p-4 border-t border-gray-100">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition">
              <LogOut className="w-5 h-5" />
              Thoát về Cửa hàng
            </Link>
          </div>
        </aside>

        {/* VÙNG NỘI DUNG CHÍNH */}
        <main className="flex-1 p-4 md:p-8 md:overflow-y-auto md:h-screen w-full">
          <div className="max-w-6xl mx-auto">
             {children}
          </div>
        </main>

      </div>
    </AdminGuard>
  );
}