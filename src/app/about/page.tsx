'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Leaf, Heart, ShieldCheck, MapPin, Smile, MessageCircle, ArrowRight } from 'lucide-react';

// --- KHU VỰC IMPORT ẢNH ---
// Bạn bỏ comment (xóa dấu //) và sửa tên file cho đúng khi đã có ảnh thật nhé
// import heroImg from '@/assets/about/about-hero.jpg';
// import missionImg from '@/assets/about/about-mission.jpg';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* =================================================================
          PHẦN 1: GIỚI THIỆU CHUNG (Hero Section)
          ================================================================= */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Cột chữ */}
          <div className="space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-blue leading-tight">
            TẤT CẢ NHU YẾU PHẨM
            {/* Thay đổi ở đây: Thêm 'block' và 'mt-4' (hoặc số khác tùy ý) */}
            <span className="text-brand-orange block mt-2">
                CHỈ TRONG MỘT CỬA HÀNG
            </span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Chúng tôi là cửa hàng bán lẻ chuyên cung cấp các mặt hàng tạp hóa và nhu yếu phẩm hằng ngày, 
              từ thực phẩm khô, đồ đông lạnh, sữa, bánh kẹo đến đồ gia dụng thiết yếu. 
              Tại đây, bạn có thể dễ dàng tìm thấy mọi thứ mình cần cho gia đình – nhanh chóng, tiện lợi và với mức giá hợp lý.
            </p>

            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-brand-orange" /> Giải pháp mua sắm thông minh:
              </h3>
              <ul className="space-y-3">
                {[
                  "Hàng cận date giá tốt - Tiết kiệm tối đa",
                  "Combo tiết kiệm thiết kế riêng cho gia đình",
                  "Gợi ý sản phẩm liên quan giúp mua sắm đủ đầy",
                  "Một điểm đến – Trọn vẹn mọi nhu cầu"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
               <Link href="/products" className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:-translate-y-1">
                  Khám phá ngay <ArrowRight className="w-5 h-5"/>
               </Link>
            </div>
          </div>

          {/* Cột ảnh */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-right-10 duration-700 fade-in">
            {/* Nếu có ảnh thật, dùng biến import: src={heroImg} */}
            <Image 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" 
              alt="Cửa hàng tiện lợi"
              fill
              className="object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* =================================================================
          PHẦN 2: THỐNG KÊ (Stats Section)
          ================================================================= */}
      <section className="bg-brand-orange py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-center text-2xl font-bold mb-12 uppercase tracking-wider opacity-90">Những con số ấn tượng</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                
                <div className="p-4">
                    <div className="text-5xl md:text-6xl font-extrabold mb-2">2,000+</div>
                    <div className="text-lg font-medium opacity-90">Mặt hàng thiết yếu mỗi ngày</div>
                </div>

                <div className="p-4">
                    <div className="text-5xl md:text-6xl font-extrabold mb-2">5,000+</div>
                    <div className="text-lg font-medium opacity-90">Khách hàng phục vụ mỗi tháng</div>
                </div>

                <div className="p-4">
                    <div className="text-5xl md:text-6xl font-extrabold mb-2">98%</div>
                    <div className="text-lg font-medium opacity-90">Đơn hàng giao nhanh 2–4h</div>
                </div>

            </div>
        </div>
      </section>

      {/* =================================================================
          PHẦN 3: SỨ MỆNH (Mission Section)
          ================================================================= */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           
           {/* Cột ảnh (Đảo bên trái trên desktop) */}
           <div className="order-2 lg:order-1 relative h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=2574&auto=format&fit=crop" 
                alt="Sống xanh"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs">
                  <p className="text-sm font-bold text-green-700 flex items-center gap-2">
                      <Leaf className="w-4 h-4"/> Cam kết xanh
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Giảm lãng phí thực phẩm là ưu tiên hàng đầu của chúng tôi.</p>
              </div>
           </div>

           {/* Cột chữ */}
           <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
                  CÙNG NHAU XÂY DỰNG <br/>
                  <span className="text-green-600">LỐI SỐNG TIẾT KIỆM & BỀN VỮNG</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                  Chúng tôi tin rằng mua sắm không chỉ là tiêu dùng, mà còn là cách mỗi người lựa chọn phong cách sống của mình.
                  Mỗi sản phẩm được chọn lọc kỹ lưỡng để đảm bảo chất lượng, nguồn gốc rõ ràng và phù hợp với nhu cầu thực tế của gia đình Việt.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                  <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                          <Heart className="w-6 h-6"/>
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-800">Tối ưu chi tiêu</h4>
                          <p className="text-sm text-gray-500">Giúp khách hàng tiết kiệm hơn với các lựa chọn thông minh.</p>
                      </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                          <Leaf className="w-6 h-6"/>
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-800">Giảm lãng phí thực phẩm</h4>
                          <p className="text-sm text-gray-500">Thông qua chương trình Smart Choice (Hàng cận date).</p>
                      </div>
                  </div>
              </div>
           </div>

        </div>
      </section>

      {/* =================================================================
          PHẦN 4: GIÁ TRỊ (Values Section)
          ================================================================= */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-brand-blue mb-4">SỰ GẦN GŨI & TIN CẬY</h2>
              <p className="text-gray-600 text-lg">
                  Chúng tôi mong muốn trở thành cửa hàng “quen thuộc” của khu vực – nơi bạn có thể ghé qua bất cứ lúc nào khi cần.
                  Đến với chúng tôi là cảm giác yên tâm và thoải mái như ở nhà.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                  {
                      icon: <MapPin className="w-8 h-8"/>,
                      title: "Không gian dễ tìm",
                      desc: "Bố trí khoa học, dễ dàng mua sắm nhanh chóng."
                  },
                  {
                      icon: <Smile className="w-8 h-8"/>,
                      title: "Nhân viên thân thiện",
                      desc: "Luôn sẵn sàng tư vấn tận tình với nụ cười trên môi."
                  },
                  {
                      icon: <ShieldCheck className="w-8 h-8"/>,
                      title: "Minh bạch đổi trả",
                      desc: "Chính sách rõ ràng, bảo vệ quyền lợi khách hàng."
                  },
                  {
                      icon: <MessageCircle className="w-8 h-8"/>,
                      title: "Luôn lắng nghe",
                      desc: "Trân trọng mọi phản hồi để phục vụ tốt hơn mỗi ngày."
                  }
              ].map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-orange hover:shadow-xl transition group duration-300">
                      <div className="w-16 h-16 mx-auto bg-gray-100 group-hover:bg-brand-orange group-hover:text-white rounded-full flex items-center justify-center text-gray-600 transition duration-300 mb-6">
                          {item.icon}
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
              ))}
          </div>
      </section>

    </main>
  );
}