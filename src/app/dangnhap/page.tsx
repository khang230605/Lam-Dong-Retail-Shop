'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Gọi hàm đăng nhập
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 2. KIỂM TRA KỸ TRƯỚC KHI DÙNG BIẾN
      // Lỗi cũ của bạn có thể do cố truy cập data.user.id mà không check
      if (data?.user) {
        // Đăng nhập thành công!
        
        // Refresh để Header cập nhật trạng thái
        router.refresh(); 
        
        // Chuyển hướng về trang chủ (hoặc trang trước đó)
        router.push('/'); 
      }

    } catch (error: any) {
      // Hiển thị lỗi ra màn hình thay vì alert
      setErrorMsg(error.message === 'Invalid login credentials' 
        ? 'Email hoặc mật khẩu không chính xác' 
        : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-brand-blue mb-2">Đăng nhập</h1>
          <p className="text-gray-500 text-sm">Chào mừng bạn quay trở lại!</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4"/> {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required
                className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
                placeholder="vidu@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-brand-orange hover:underline font-medium">
              Quên mật khẩu?
            </Link>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'ĐĂNG NHẬP'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Chưa có tài khoản? <Link href="/dangky" className="text-brand-blue font-bold hover:underline">Đăng ký ngay</Link>
        </div>
      </div>
    </main>
  );
}