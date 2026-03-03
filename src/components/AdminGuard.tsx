'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { Loader2 } from 'lucide-react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      // 1. Lấy thông tin user đang đăng nhập từ Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        // Chưa đăng nhập -> Đẩy về trang đăng nhập
        router.push('/dangnhap');
        return;
      }

      // 2. Truy vấn vào bảng 'profiles' để check cột 'role'
      const { data: profile, error: profileError } = await supabase
        .from('profiles') // Đã trỏ đúng vào bảng profiles
        .select('role')
        .eq('id', user.id)
        .single();

      // Nếu không tìm thấy profile, bị lỗi, hoặc role KHÔNG PHẢI admin
      if (profileError || !profile || profile.role !== 'admin') {
        alert('Cảnh báo: Bạn không có quyền truy cập khu vực quản trị!');
        router.push('/'); // Đẩy về trang chủ ngay lập tức
        return;
      }

      // 3. Vượt qua mọi bài test -> Cấp quyền hiển thị trang Admin
      setIsAuthorized(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange mb-4" />
        <p className="text-gray-500 font-medium">Đang xác thực phân quyền...</p>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}