'use client';

import { useState } from 'react';
import { ContactService } from '@/services/ContactService';
import { 
  Loader2, Send, CheckCircle2, MapPin, Phone, Mail, 
  TrendingUp, Package, ShieldCheck, Zap, Target, Users, ArrowRight 
} from 'lucide-react';

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
      <div className="container mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* =========================================================
                CỘT TRÁI: THÔNG TIN B2B SUBSCRIPTION
                ========================================================= */}
            <div className="lg:col-span-7 space-y-10 text-gray-700 leading-relaxed">
                
                {/* Header Section */}
                <div>
                    <div className="inline-flex items-center gap-2 text-brand-orange font-bold bg-orange-100 px-3 py-1 rounded-full text-sm mb-4">
                        <Zap className="w-4 h-4" /> Giải pháp tối ưu cho doanh nghiệp
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-brand-blue mb-6 leading-tight">
                        Velocity Enabler: <br className="hidden md:block" />
                        <br className="block md:hidden" />
                        <span className="text-brand-orange">B2B Subscription</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 font-medium">
                        Gói đặt hàng định kỳ dành cho doanh nghiệp B2B có tốc độ tiêu thụ nhanh, không có nhu cầu trữ kho dài hạn.
                    </p>
                </div>

                {/* Mục tiêu gói */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-xl text-brand-blue mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6" /> Gói được thiết kế để:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Tối ưu tiêu thụ hàng dùng ngắn ngày",
                            "Đẩy volume lớn nhanh và ổn định",
                            "Mang lại lợi thế giá cạnh tranh cho đối tác",
                            "Giảm tồn kho nhưng vẫn đảm bảo tiêu chuẩn chất lượng"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="font-medium text-gray-800">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cấu trúc gói */}
                <div>
                    <h2 className="text-2xl font-bold text-brand-blue mb-6">Cấu trúc gói Velocity Enabler hoạt động như thế nào?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Box 1 */}
                        <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                            <div className="w-18 h-12 bg-brand-orange text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">30-40%</div>
                            <h4 className="font-bold text-lg text-gray-900 mb-3">Sản phẩm dùng ngắn ngày <br/> <span className="text-sm font-normal text-gray-500">(Short-Term Use Products)</span></h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex gap-2"><span className="text-brand-orange">•</span> Thời hạn sử dụng còn lại: 5–10 ngày</li>
                                <li className="flex gap-2"><span className="text-brand-orange">•</span> Phù hợp với mô hình bán nhanh trong 3–7 ngày</li>
                                <li className="flex gap-2"><span className="text-brand-orange">•</span> Được kiểm soát nghiêm ngặt về bảo quản</li>
                                <li className="flex gap-2"><span className="text-brand-orange">•</span> Đảm bảo tiêu chuẩn chất lượng & ATTP</li>
                            </ul>
                            <div className="mt-4 pt-4 border-t border-orange-200/50">
                                <p className="text-sm font-bold text-gray-800 mb-1">Ví dụ nhóm hàng:</p>
                                <p className="text-sm text-gray-600">Cá viên, tôm viên, thực phẩm đông lạnh bán chạy, chế biến sẵn tiêu thụ nhanh.</p>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                            <div className="w-18 h-12 bg-brand-blue text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">60-70%</div>
                            <h4 className="font-bold text-lg text-gray-900 mb-3">Sản phẩm tiêu chuẩn <br/> <span className="text-sm font-normal text-gray-500">(Standard Fast-Moving Items)</span></h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex gap-2"><span className="text-brand-blue">•</span> Hạn sử dụng bình thường</li>
                                <li className="flex gap-2"><span className="text-brand-blue">•</span> Nhóm hàng bán ổn định</li>
                                <li className="flex gap-2"><span className="text-brand-blue">•</span> Giúp cân bằng cơ cấu đơn hàng</li>
                            </ul>
                            <div className="mt-4 pt-4 border-t border-blue-200/50">
                                <p className="text-sm font-bold text-gray-800 mb-1">Lợi ích cơ cấu:</p>
                                <p className="text-sm text-gray-600">Giúp doanh nghiệp vẫn an toàn tồn kho, không phụ thuộc hoàn toàn vào hàng ngắn ngày nhưng vẫn hưởng lợi thế giá trên toàn đơn.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chính sách & Cam kết */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <h3 className="font-bold text-xl text-brand-blue mb-3 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6" /> Cam kết chất lượng
                            </h3>
                            <p className="text-sm italic mb-4 text-gray-500">
                                "Velocity Enabler không phải là chương trình xả hàng. Đây là giải pháp tối ưu vòng đời sản phẩm có kiểm soát."
                            </p>
                            <ul className="space-y-2 text-sm font-medium">
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/> Đạt tiêu chuẩn chất lượng trước khi giao</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/> Đảm bảo điều kiện bảo quản đúng quy định</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/> Đổi trả 24–48h nếu phát sinh lỗi kỹ thuật</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/> Xử lý nhanh nếu không đạt cam kết</li>
                            </ul>
                        </div>
                        <div className="md:w-1/2">
                            <h3 className="font-bold text-xl text-brand-blue mb-3 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" /> Lợi thế giá
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <span className="font-bold text-brand-orange block">Tiết kiệm 10–20%</span>
                                    So với nhập lẻ nhờ cơ cấu tỷ trọng hàng dùng ngắn ngày.
                                </li>
                                <li className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <span className="font-bold text-brand-blue block">Chiết khấu theo volume</span>
                                    Cùng ưu tiên phân bổ nguồn hàng bán nhanh.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Phù hợp với ai */}
                <div>
                    <h3 className="font-bold text-xl text-brand-blue mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6" /> Gói này phù hợp với ai?
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {["Doanh nghiệp tiêu thụ cao", "Bán hàng theo tuần", "Không trữ kho dài hạn", "Chuỗi cửa hàng" , "Quán ăn / Bếp công nghiệp", "Đại lý bán sỉ", "Muốn quay vòng vốn nhanh"].map((tag, idx) => (
                            <span key={idx} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Chốt Sale */}
                <div className="bg-brand-blue text-white p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                        <Package className="w-48 h-48" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4 text-brand-white">Đăng ký Velocity Enabler ngay hôm nay</h2>
                        <p className="mb-6 opacity-90 leading-relaxed max-w-2xl">
                            Nếu doanh nghiệp của bạn cần hàng để bán ngay trong tuần, có khả năng tiêu thụ nhanh và muốn tối ưu dòng tiền, biên lợi nhuận thì đây chính là giải pháp dành cho bạn.
                        </p>
                        <p className="font-bold flex items-center gap-2 text-lg">
                            <ArrowRight className="text-brand-orange" /> Điền form bên cạnh để đội ngũ B2B thiết kế cơ cấu đơn hàng cho bạn!
                        </p>
                    </div>
                </div>

            </div>


            {/* =========================================================
                CỘT PHẢI: FORM LIÊN HỆ & THÔNG TIN (STICKY)
                ========================================================= */}
            <div className="lg:col-span-5 relative">
                {/* Dùng sticky để khối này trượt theo khi scroll cột trái */}
                <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    
                    {/* Phần Form */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-brand-blue mb-2">Gửi yêu cầu tư vấn</h2>
                            <p className="text-sm text-gray-500">Điền thông tin doanh nghiệp của bạn, chúng tôi sẽ liên hệ lại ngay.</p>
                        </div>

                        {success ? (
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center animate-fade-in">
                                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                <h3 className="font-bold text-green-800 text-lg">Đã gửi yêu cầu!</h3>
                                <p className="text-green-700 text-sm mt-1">Đội ngũ B2B sẽ phản hồi bạn sớm nhất có thể.</p>
                                <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-bold underline text-green-800">Gửi yêu cầu khác</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input 
                                        name="name" type="text" placeholder="Tên của bạn / Tên doanh nghiệp *" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange focus:bg-white transition"
                                        required value={formData.name} onChange={handleChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input 
                                            name="phone" type="text" placeholder="Số điện thoại *" 
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange focus:bg-white transition"
                                            required value={formData.phone} onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            name="email" type="email" placeholder="Email" 
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange focus:bg-white transition"
                                            value={formData.email} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <input 
                                        name="subject" type="text" placeholder="Tiêu đề (VD: Tư vấn gói Subscription)" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange focus:bg-white transition"
                                        value={formData.subject} onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        name="message" rows={4} placeholder="Chia sẻ thêm về nhu cầu tiêu thụ của bạn *" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange focus:bg-white transition resize-none"
                                        required value={formData.message} onChange={handleChange}
                                    />
                                </div>
                                <button 
                                    type="submit" disabled={loading}
                                    className="w-full bg-brand-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2 text-lg"
                                >
                                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Đăng ký nhận tư vấn <Send className="w-5 h-5" /></>}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Phần thông tin liên hệ trực tiếp */}
                    <div className="bg-gray-50 p-8 border-t border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Hoặc liên hệ trực tiếp</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-brand-blue">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-0.5">Văn phòng / Cửa hàng</p>
                                    <p className="font-medium text-gray-800 text-sm">50 Phan Đình Phùng, Phường Xuân Hương - Đà Lạt, Tỉnh Lâm Đồng</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-0.5">Hotline B2B</p>
                                    <p className="font-bold text-gray-800 text-lg">1900 2222</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-brand-orange">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-0.5">Email</p>
                                    <p className="font-medium text-gray-800">lamdongtrading.co@gmail.com</p>
                                </div>
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