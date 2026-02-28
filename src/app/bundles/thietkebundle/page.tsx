'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Loader2, Send, Sparkles } from 'lucide-react';
import { BundleService } from '@/services/BundleService';

// Danh sách các nhóm món ăn (Lấy đúng 100% từ danh mục con của bạn kèm icon tương ứng)
const CATEGORY_OPTIONS = [
  { id: 'thit-heo', label: 'Thịt heo', icon: '🥩' },
  { id: 'thit-bo', label: 'Thịt bò', icon: '🥩' },
  { id: 'tom', label: 'Tôm', icon: '🦐' },
  { id: 'ca', label: 'Cá', icon: '🐟' },
  { id: 'muc', label: 'Mực', icon: '🦑' },
  { id: 'xuc-xich', label: 'Xúc xích', icon: '🌭' },
  { id: 'banh-bao', label: 'Bánh bao', icon: '🥟' },
  { id: 'cha-gio-nem', label: 'Chả, giò, nem', icon: '🧆' },
  { id: 'banh-xep', label: 'Bánh xếp', icon: '🥟' },
  { id: 'mi-goi', label: 'Mì gói', icon: '🍜' },
  { id: 'pho-goi', label: 'Phở gói', icon: '🍲' },
  { id: 'gao', label: 'Gạo', icon: '🍚' },
  { id: 'ngu-coc', label: 'Ngũ cốc', icon: '🥣' },
  { id: 'tuong-ot', label: 'Tương ớt', icon: '🌶️' },
  { id: 'nuoc-ngot', label: 'Nước ngọt', icon: '🥤' },
  { id: 'nuoc-suoi', label: 'Nước suối', icon: '💧' },
  { id: 'yen', label: 'Yến', icon: '🍯' },
  { id: 'sua-tuoi', label: 'Sữa tươi', icon: '🥛' },
  { id: 'sua-dac', label: 'Sữa đặc', icon: '🥛' },
  { id: 'sua-chua', label: 'Sữa chua', icon: '🥣' },
  { id: 'vang-sua', label: 'Váng sữa', icon: '🍮' },
  { id: 'pho-mai', label: 'Phô mai', icon: '🧀' },
  { id: 'cac-loai-kem', label: 'Các loại kem', icon: '🍦' },
  { id: 'keo', label: 'Kẹo', icon: '🍬' },
  { id: 'banh-gao', label: 'Bánh gạo', icon: '🍘' },
  { id: 'cac-loai-banh', label: 'Các loại bánh', icon: '🍪' },
];

export default function DesignBundlePage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Hàm xử lý chọn/bỏ chọn nhóm món
  const toggleCategory = (id: string) => {
    if (selectedCats.includes(id)) {
      setSelectedCats(selectedCats.filter(item => item !== id));
    } else {
      if (selectedCats.length < 3) {
        setSelectedCats([...selectedCats, id]);
      } else {
        alert("Bạn chỉ được chọn tối đa 3 nhóm món nhé!");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCats.length === 0) {
      setErrorMsg('Vui lòng chọn ít nhất 1 nhóm món.');
      return;
    }
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Vui lòng điền đủ Tên và Số điện thoại (Zalo).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Dịch ID ra Tên nhãn để lưu vào DB cho dễ đọc
      const selectedLabels = selectedCats.map(
        id => CATEGORY_OPTIONS.find(c => c.id === id)?.label || id
      );

      await BundleService.submitBundleDesign({
        name,
        phone,
        selected_categories: selectedLabels
      });
      setSuccess(true);
    } catch (error) {
      setErrorMsg('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Nới rộng khung chứa ra max-w-5xl để chứa đẹp 26 danh mục */}
      <div className="container mx-auto max-w-5xl">
        
        <Link href="/bundles" className="inline-flex items-center text-gray-500 hover:text-brand-orange mb-8 font-medium transition">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại Gói tiết kiệm
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-brand-blue p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                <Sparkles className="w-32 h-32" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">
               Thiết Kế Giỏ Hàng Essentials
            </h1>
            <p className="text-lg opacity-90 relative z-10 max-w-2xl mx-auto">
               Chỉ cần chọn 3 nhóm thực phẩm, chúng tôi sẽ thiết kế lộ trình giúp gia đình bạn mua sắm thông minh và tiết kiệm lên đến 200K mỗi tháng.
            </p>
          </div>

          <div className="p-8 md:p-12">
            {success ? (
              <div className="text-center py-10 animate-fade-in">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h2>
                 <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Cảm ơn <b>{name}</b> đã đăng ký. Đội ngũ của chúng tôi đang thiết kế giỏ hàng riêng cho bạn và sẽ gửi qua Zalo (<b>{phone}</b>) trong thời gian sớm nhất nhé!
                 </p>
                 <Link href="/bundles" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                    Trở về danh sách Combo
                 </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                
                {/* Bước 1: Chọn món */}
                <div className="mb-10">
                  <div className="flex items-baseline justify-between mb-6 border-b border-gray-100 pb-4">
                      <h3 className="text-xl font-bold text-gray-800">1. Chọn 3 nhóm món bạn hay dùng nhất:</h3>
                      <span className="text-sm font-bold text-brand-orange bg-orange-50 px-3 py-1 rounded-lg">
                          Đã chọn: {selectedCats.length} / 3
                      </span>
                  </div>
                  
                  {/* Điều chỉnh Grid để hiển thị 26 thẻ nhỏ gọn, đẹp mắt hơn */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const isSelected = selectedCats.includes(cat.id);
                      return (
                        <div 
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={`cursor-pointer border-2 rounded-xl p-3 text-center transition duration-200 flex flex-col items-center gap-1.5 select-none ${
                            isSelected 
                                ? 'border-brand-orange bg-orange-50 shadow-md transform -translate-y-1 scale-105' 
                                : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5'
                          }`}
                        >
                          <span className="text-2xl">{cat.icon}</span>
                          <span className={`text-xs font-semibold leading-tight ${isSelected ? 'text-brand-orange' : 'text-gray-600'}`}>
                             {cat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bước 2: Điền thông tin */}
                <div className="mb-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">2. Nhận kết quả qua Zalo:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input 
                        type="text" 
                        placeholder="Tên của bạn *" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue shadow-sm transition"
                     />
                     <input 
                        type="tel" 
                        placeholder="Số điện thoại (Zalo) *" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue shadow-sm transition"
                     />
                  </div>
                </div>

                {errorMsg && <p className="text-red-500 text-sm font-medium mb-4 text-center">{errorMsg}</p>}

                {/* Nút Submit */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto md:min-w-[400px] mx-auto bg-brand-orange text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <>Gửi lộ trình tiết kiệm qua Zalo cho tôi <Send className="w-5 h-5" /></>}
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}