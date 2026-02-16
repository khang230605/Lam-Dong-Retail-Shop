'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import ảnh banner (Đảm bảo bạn đã có file ảnh trong thư mục này)
import banner1 from './banner/banner1.png'; 
import banner2 from './banner/banner2.png'; 
import banner3 from './banner/banner3.png'; 

const BANNERS = [
  {
    id: 1,
    image: banner1,
    link: "/products",
    alt: "Banner Smart Choice" // Thêm alt để tốt cho SEO
  },
  {
    id: 2,
    image: banner2,
    link: "/bundles/ngay-ngot-ngao",
    alt: "Banner bundle ngày ngọt ngào"
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Tự động trượt sau 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  return (
    <section className="container mx-auto px-4 mt-6 max-w-4xl">
      {/* Khung chứa chính */}
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl group">

        {/* --- THANH TRƯỢT (TRACK) --- */}
        <div 
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {BANNERS.map((banner, index) => (
            <div 
              key={banner.id} 
              className="w-full h-full flex-shrink-0 relative"
            >
              {/* Bọc ảnh trong thẻ Link để click được toàn bộ ảnh */}
              <Link href={banner.link} className="block w-full h-full relative cursor-pointer">
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill // Tự động fill đầy khung
                    className="object-cover" // Giữ tỷ lệ ảnh, cắt bớt phần thừa nếu khung không vừa
                    priority={index === 0} // Ưu tiên load ảnh đầu
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
              </Link>
            </div>
          ))}
        </div>

        {/* --- NÚT ĐIỀU HƯỚNG (Vẫn giữ lại để người dùng bấm) --- */}
        
        {/* Nút Trái */}
        <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white text-white hover:text-brand-orange p-2 rounded-full backdrop-blur-md transition opacity-0 group-hover:opacity-100 shadow-lg border border-white/20"
        >
            <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Nút Phải */}
        <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white text-white hover:text-brand-orange p-2 rounded-full backdrop-blur-md transition opacity-0 group-hover:opacity-100 shadow-lg border border-white/20"
        >
            <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dấu chấm tròn (Indicator) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {BANNERS.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                        index === current ? 'bg-brand-orange w-8' : 'bg-white w-2 hover:bg-orange-200'
                    }`}
                />
            ))}
        </div>

      </div>
    </section>
  );
}