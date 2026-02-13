'use client';

import { useState } from 'react';
import { ContactService } from '@/services/ContactService';
import { Loader2, Send, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // State form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ContactService.sendMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header nhỏ */}
        <div className="text-center mb-12">
           <h1 className="text-4xl font-extrabold text-brand-blue mb-4">Liên hệ với chúng tôi</h1>
           <p className="text-gray-500">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7</p>
        </div>

        {/* Khối nội dung chính */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
           
           {/* CỘT TRÁI: FORM (Giống mẫu ảnh) */}
           <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="mb-8">
                 <h2 className="text-2xl font-bold text-brand-blue mb-2">Gửi tin nhắn</h2>
                 <p className="text-sm text-gray-500">Địa chỉ email của bạn sẽ không được công khai. Các trường bắt buộc được đánh dấu *</p>
              </div>

              {success ? (
                 <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center animate-fade-in">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-bold text-green-800 text-lg">Gửi tin nhắn thành công!</h3>
                    <p className="text-green-700 text-sm mt-1">Chúng tôi sẽ phản hồi bạn sớm nhất có thể.</p>
                    <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-bold underline text-green-800">Gửi tin nhắn khác</button>
                 </div>
              ) : (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                          <input 
                             name="name"
                             type="text" 
                             placeholder="Tên của bạn *" 
                             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:bg-white transition"
                             required
                             value={formData.name}
                             onChange={handleChange}
                          />
                       </div>
                       <div>
                          <input 
                             name="email"
                             type="email" 
                             placeholder="Email *" 
                             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:bg-white transition"
                             required
                             value={formData.email}
                             onChange={handleChange}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                          <input 
                             name="phone"
                             type="text" 
                             placeholder="Số điện thoại" 
                             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:bg-white transition"
                             value={formData.phone}
                             onChange={handleChange}
                          />
                       </div>
                       <div>
                          <input 
                             name="subject"
                             type="text" 
                             placeholder="Tiêu đề" 
                             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:bg-white transition"
                             value={formData.subject}
                             onChange={handleChange}
                          />
                       </div>
                    </div>

                    <div>
                       <textarea 
                          name="message"
                          rows={5}
                          placeholder="Nội dung tin nhắn *" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:bg-white transition resize-none"
                          required
                          value={formData.message}
                          onChange={handleChange}
                       />
                    </div>

                    <button 
                       type="submit"
                       disabled={loading}
                       className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-lg shadow-green-200 flex items-center gap-2"
                    >
                       {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Gửi tin nhắn <Send className="w-4 h-4" /></>}
                    </button>
                 </form>
              )}
           </div>

           {/* CỘT PHẢI: ẢNH & THÔNG TIN (Giống mẫu ảnh) */}
           <div className="w-full md:w-1/2 relative min-h-[400px]">
              <img 
                 src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop" 
                 alt="Contact Support" 
                 className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Lớp phủ thông tin liên hệ trực tiếp */}
              <div className="absolute inset-0 bg-brand-blue/80 p-12 flex flex-col justify-end text-white backdrop-blur-[2px]">
                 <h3 className="text-2xl font-bold mb-6">Thông tin liên hệ</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-xs opacity-70">Địa chỉ</p>
                          <p className="font-medium">123 Đường Hùng Vương, Phường 9, TP. Đà Lạt, Lâm Đồng</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-xs opacity-70">Hotline</p>
                          <p className="font-medium">1900 1234</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-xs opacity-70">Email</p>
                          <p className="font-medium">support@lamdongretail.com</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </main>
  );
}