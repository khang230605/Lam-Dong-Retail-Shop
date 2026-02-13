'use client';

import { useState } from 'react';
import { RefundService } from '@/services/RefundService';
import { UploadCloud, X, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
  // State quản lý form
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // State trạng thái
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Xử lý chọn ảnh & Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Tạo link preview nội bộ
    }
  };

  // Xóa ảnh đã chọn
  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  // Gửi form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !reason) {
        alert("Vui lòng điền đầy đủ Mã đơn hàng và Lý do.");
        return;
    }

    setLoading(true);
    try {
      await RefundService.createRefundRequest(orderId, reason, imageFile || undefined);
      setIsSuccess(true); // Chuyển sang màn hình thành công
    } catch (error: any) {
      alert("Gửi yêu cầu thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- MÀN HÌNH THÀNH CÔNG ---
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center animate-fade-in">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
           </div>
           <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Đã gửi yêu cầu!</h2>
           <p className="text-gray-600 mb-6 leading-relaxed">
              Đơn yêu cầu hoàn tiền cho mã đơn <b>#{orderId}</b> của bạn đang được xác nhận. 
              Chúng tôi sẽ thông báo kết quả tới bạn trong vòng <b>24h tới</b>.
           </p>
           <Link href="/" className="block w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              Quay về trang chủ
           </Link>
        </div>
      </main>
    );
  }

  // --- MÀN HÌNH FORM ---
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-brand-blue p-8 text-white">
           <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldAlert className="w-6 h-6" /> Trung tâm hỗ trợ
           </h1>
           <p className="opacity-80 mt-1">Gửi yêu cầu hoàn tiền hoặc đổi trả sản phẩm</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
           
           {/* 1. Mã đơn hàng */}
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mã đơn hàng *</label>
              <input 
                type="text"
                placeholder="VD: #ORD-12345"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-brand-orange"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
           </div>

           {/* 2. Ảnh bằng chứng (Upload & Preview) */}
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh sản phẩm (Nếu có)</label>
              
              {!previewUrl ? (
                // Nút Upload
                <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition hover:border-brand-orange group">
                    <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-brand-orange mb-2" />
                    <span className="text-sm text-gray-500 font-medium">Nhấn để tải ảnh lên</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              ) : (
                // Preview ảnh
                <div className="relative rounded-xl overflow-hidden border border-gray-200 w-full h-64 bg-gray-100">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    <button 
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
              )}
           </div>

           {/* 3. Lý do */}
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Chi tiết vấn đề *</label>
              <textarea 
                rows={4}
                placeholder="Vui lòng mô tả chi tiết lý do bạn muốn hoàn tiền..."
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-brand-orange"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
           </div>

           {/* Submit Button */}
           <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
           >
              {loading ? <Loader2 className="animate-spin" /> : 'GỬI YÊU CẦU'}
           </button>

           <p className="text-xs text-gray-400 text-center italic">
              * Chúng tôi cam kết bảo mật thông tin và giải quyết khiếu nại công bằng.
           </p>
        </form>
      </div>
    </main>
  );
}