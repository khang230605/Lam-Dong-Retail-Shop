'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase'; // Giữ nguyên import cũ
import { Loader2, MailCheck } from 'lucide-react'; // Thêm icon MailCheck

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State mới để hiện thông báo
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Đăng ký tài khoản Auth
      // QUAN TRỌNG: Thêm options emailRedirectTo để chỉ định link quay về
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          // Link này phải trùng với cái đã khai báo ở Bước 1 trong Supabase
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: formData.fullName, // Lưu luôn tên vào metadata cho tiện
          }
        }
      });

      if (authError) throw authError;

      // 2. Lưu thông tin vào bảng profiles (Vẫn giữ logic cũ)
      // Lưu ý: Khi bật Confirm Email, user chưa được tạo ngay lập tức trong bảng users public đâu
      // Nhưng ta cứ insert profile, Supabase sẽ xử lý ràng buộc
      if (authData.user && authData.user.identities && authData.user.identities.length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            role: 'customer'
          });
        
        if (profileError) {
             console.error("Lỗi tạo profile:", profileError);
             // Không throw error ở đây để vẫn hiện thông báo check mail
        }
      } else {
          // Trường hợp email đã tồn tại nhưng chưa confirm
          if (!authData.user) throw new Error("Email này đã được đăng ký.");
      }

      // 3. Hiện thông báo thành công thay vì redirect
      setSuccess(true);

    } catch (error: any) {
      alert('Lỗi đăng ký: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // NẾU ĐĂNG KÝ THÀNH CÔNG -> HIỆN GIAO DIỆN NÀY
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 text-center">
           <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MailCheck className="w-10 h-10" />
           </div>
           <h1 className="text-2xl font-bold text-gray-800 mb-4">Kiểm tra email của bạn</h1>
           <p className="text-gray-600 mb-6">
             Chúng tôi đã gửi một đường dẫn xác nhận đến <b>{formData.email}</b>.<br/>
             Vui lòng bấm vào đường dẫn đó để kích hoạt tài khoản.
           </p>
           <p className="text-sm text-gray-400">
             Chưa nhận được? <span className="text-brand-orange cursor-pointer hover:underline" onClick={() => alert("Chức năng gửi lại đang phát triển")}>Gửi lại</span>
           </p>
           <div className="mt-8 pt-6 border-t">
              <Link href="/dangnhap" className="text-brand-blue font-bold hover:underline">
                 Quay về trang đăng nhập
              </Link>
           </div>
        </div>
      </div>
    );
  }

  // GIAO DIỆN FORM ĐĂNG KÝ (GIỮ NGUYÊN CODE CŨ, CHỈ SỬA RETURN Ở TRÊN)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* ... (Code form cũ giữ nguyên, chỉ thay đổi phần onSubmit={handleRegister}) ... */}
       <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blue mb-2">Tạo tài khoản mới</h1>
          <p className="text-gray-500">Trở thành thành viên của Lâm Đồng Retail</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Họ và tên</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
              placeholder="Nguyễn Văn A"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
              placeholder="email@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
              placeholder="******"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Đăng Ký Ngay'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Đã có tài khoản? <Link href="/dangnhap" className="text-brand-blue font-bold hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}