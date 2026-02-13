'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/flat-lay-vegetables-frame_23-2148516757.jpg?w=1380",
    title: "Thực phẩm tươi ngon",
    highlight: "Từ nông trại",
    subtitle: "Cam kết 100% nông sản sạch Đà Lạt. Giao hàng nhanh trong 2h.",
    link: "/products"
  },
  {
    id: 2,
    image: "https://img.freepik.com/free-photo/fresh-fruit-stall-market_53876-14682.jpg?w=1380",
    title: "Đại tiệc trái cây",
    highlight: "Mùa hè mát lạnh",
    subtitle: "Giảm giá đến 50% các loại trái cây nhiệt đới. Mua ngay kẻo lỡ!",
    link: "/products"
  },
  {
    id: 3,
    image: "https://img.freepik.com/free-photo/assortment-various-barbecue-food-grill-meat_1150-37728.jpg?w=1380",
    title: "Combo đồ nướng",
    highlight: "Cuối tuần vui vẻ",
    subtitle: "Đầy đủ thịt, rau, nước chấm. Chỉ cần bật bếp là có ngay tiệc ngon.",
    link: "/bundles"
  }
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
    <section className="container mx-auto px-4 mt-6">
      {/* Khung chứa chính: overflow-hidden để che các phần bị đẩy ra ngoài */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl group">

        {/* --- PHẦN KHÁC BIỆT CHÍNH: THANH TRƯỢT (TRACK) --- */}
        {/* Chúng ta dùng flex để xếp ảnh hàng ngang và translateX để di chuyển */}
        <div 
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div 
              key={banner.id} 
              className="w-full h-full flex-shrink-0 relative" // flex-shrink-0 để ảnh không bị co lại
            >
              {/* 1. ẢNH NỀN */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              
              {/* 2. LỚP PHỦ ĐEN MỜ */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

              {/* 3. NỘI DUNG CHỮ */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
                  <span className="inline-block bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                      HOT DEAL
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
                      {banner.title} <br/>
                      <span className="text-brand-orange">{banner.highlight}</span>
                  </h1>
                  <p className="text-gray-200 text-sm md:text-lg max-w-lg mb-8">
                      {banner.subtitle}
                  </p>
                  
                  <div className="flex gap-4">
                      <Link href={banner.link} className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2 w-fit shadow-lg transform hover:-translate-y-1">
                          Mua ngay <ArrowRight className="w-5 h-5" />
                      </Link>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* CÁC NÚT ĐIỀU HƯỚNG (Nằm đè lên trên thanh trượt) */}
        
        {/* Nút Trái */}
        <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white text-white hover:text-brand-blue p-2 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
        >
            <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Nút Phải */}
        <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white text-white hover:text-brand-blue p-2 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
        >
            <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dấu chấm tròn */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {BANNERS.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        index === current ? 'bg-brand-orange w-8' : 'bg-white/50 w-2 hover:bg-white'
                    }`}
                />
            ))}
        </div>

      </div>
    </section>
  );
}