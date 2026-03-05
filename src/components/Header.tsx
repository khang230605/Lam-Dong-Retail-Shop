'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Search, Menu, Phone, Heart, ChevronDown, X, ChevronRight, Shield } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { CategoryService, Category } from '@/services/CategoryService';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter(); // Khai báo router
  const [searchQuery, setSearchQuery] = useState(''); // State lưu từ khóa
  const { totalItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // STATE ĐIỀU KHIỂN MENU MOBILE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCatId, setExpandedCatId] = useState<number | null>(null);

  // THÊM: STATE KIỂM TRA QUYỀN ADMIN
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      const data = await CategoryService.getTree();
      setCategories(data);
    };
    fetchCats();
  }, []);
  
  useEffect(() => {
    // Hàm lấy user hiện tại (chạy 1 lần đầu)
    const getUserAndCheckRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // Nếu có user, kiểm tra xem có phải Admin không
      if (currentUser) {
          const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', currentUser.id)
              .single();
          
          if (profile?.role === 'admin') {
              setIsAdmin(true);
          } else {
              setIsAdmin(false);
          }
      } else {
          setIsAdmin(false); // Reset khi không có user
      }
    };
    getUserAndCheckRole();

    // ĐẶT ĂNG-TEN LẮNG NGHE (Listener)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user);
        
        // Cập nhật lại quyền Admin khi đăng nhập thành công
        if (session?.user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();
            setIsAdmin(profile?.role === 'admin');
        }

        router.refresh(); 
      } 
      else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAdmin(false); // Xóa quyền admin khi đăng xuất
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Hàm mở rộng danh mục con trong mobile menu
  const toggleAccordion = (id: number) => {
    setExpandedCatId(expandedCatId === id ? null : id);
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Hàm xử lý khi bấm nút Admin
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn chặn thẻ <a> F5 ngay lập tức
    setIsMobileMenuOpen(false); // Tự động đóng menu trên mobile (nếu đang mở)
    
    // 1. Chuyển sang trang admin ngay lập tức bằng Next.js Router (không load lại trang)
    router.push('/admin');

    // 2. Hẹn giờ đúng 2000ms (2 giây) sau đó ép trình duyệt F5 (Hard Reload)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-white shadow-md">

      {/* TẦNG 2: MAIN HEADER */}
      <div className="bg-brand-blue text-white py-3 md:py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
            
            {/* LOGO & ADMIN BUTTON */}
            <div className="flex items-center gap-2 md:gap-4">
                <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tighter flex flex-col leading-none">
                  <span>LÂM ĐỒNG</span>
                  <span className="text-[10px] md:text-sm font-bold text-brand-orange tracking-widest">CỬA HÀNG BÁN LẺ</span>
                </Link>

                {/* --- NÚT ADMIN PANEL (Đã hiển thị trên Mobile) --- */}
                {isAdmin && (
                  <a 
                    href="/admin" 
                    onClick={handleAdminClick} /* Thêm sự kiện onClick mới ở đây */
                    className="flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:px-3 md:py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm font-bold text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 shadow-sm cursor-pointer"
                    title="Vào trang quản trị"
                  >
                    <Shield className="w-4 h-4 md:w-4 md:h-4 text-brand-orange" />
                    <span className="hidden md:inline-block ml-1.5">Trang Quản Trị</span>
                  </a>
                )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0 md:order-3">
               <div className="hidden xl:flex items-center gap-2 text-right">
                   <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                       <Phone className="w-5 h-5 text-brand-orange" />
                   </div>
                   <div>
                       <p className="text-white text-lg font-bold leading-none">1900 2222</p>
                       <p className="text-[10px] text-gray-300"></p>
                   </div>
               </div>

               <div className="flex items-center gap-3 md:gap-5">
                   
                   <Link href="/giohang" className="relative group">
                       <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 group-hover:text-brand-orange transition-colors" />
                       {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                          {totalItems}
                        </span>
                       )}
                   </Link>

                   {user ? (
                        <Link href="/profile" className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-7 h-7 md:w-8 md:h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xs">
                                {(user.user_metadata?.full_name || user.email)?.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden xl:block text-left">
                                <p className="text-[10px] text-gray-300">Xin chào,</p>
                                <p className="text-xs font-bold text-white truncate max-w-[120px]">
                                    {user.user_metadata?.full_name || user.email}
                                </p>
                            </div>
                        </Link>
                    ) : (
                        <Link href="/dangnhap" className="flex items-center gap-1 group">
                            <User className="w-6 h-6 md:w-7 md:h-7 group-hover:text-brand-orange transition-colors" />
                            <div className="hidden xl:block text-left">
                                <p className="text-[10px] text-gray-300">Xin chào,</p>
                                <p className="text-xs font-bold group-hover:text-brand-orange">Đăng nhập</p>
                            </div>
                        </Link>
                    )}
               </div>
            </div>

            {/* SEARCH BAR */}
            <div className="w-full md:w-auto md:flex-1 max-w-2xl relative group order-last md:order-2 mt-2 md:mt-0">
              <div className="flex w-full bg-white rounded-full overflow-hidden p-1">
                 <input 
                   type="text" 
                   value={searchQuery} // Bind giá trị
                   onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật state
                   onKeyDown={handleKeyDown} // Bắt sự kiện Enter
                   placeholder="Tìm sản phẩm..." 
                   className="flex-1 px-4 text-gray-800 outline-none text-sm py-2 md:py-0"
                 />
                 
                 <button 
                   onClick={handleSearch} // Bắt sự kiện Click
                   className="bg-brand-orange text-white px-4 md:px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors flex items-center gap-2"
                 >
                   <Search className="w-4 h-4" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TẦNG 3: NAVIGATION MENU */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-4 md:gap-8 py-3 text-sm font-bold text-gray-700 overflow-x-auto whitespace-nowrap scrollbar-hide">
        
            <li className="flex-shrink-0">
                <Link href="/" className="hover:text-brand-blue text-brand-blue">Trang chủ</Link>
            </li>
            
            {/* --- MỤC SẢN PHẨM --- */}
            <li className="group static flex-shrink-0 flex items-center"> 
                <Link href="/products" className="hover:text-brand-blue py-3 block">
                    Sản phẩm
                </Link>

                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden p-2 ml-1 text-gray-500 hover:text-brand-orange"
                >
                    <ChevronDown className="w-4 h-4"/>
                </button>

                <ChevronDown className="w-3 h-3 hidden md:block ml-1"/>
                
                <div className="hidden md:block">
                    <MegaMenu categories={categories} />
                </div>
            </li>
            
            <li className="flex-shrink-0">
                <Link href="/bundles" className="text-brand-orange hover:text-orange-700 flex items-center gap-1">
                ⚡Gói Tiết Kiệm
                </Link>
            </li>
            
            <li className="flex-shrink-0">
                <Link href="/about" className="hover:text-brand-blue">Về chúng tôi</Link>
            </li>

            <li className="flex-shrink-0">
                <Link href="/hotro" className="hover:text-brand-orange transition-colors">Hỗ trợ</Link>
            </li>
            
            {/* <li className="flex-shrink-0">
                <Link href="/lienhe" className="hover:text-brand-orange transition">
                    Liên hệ
                </Link>
            </li> */}

          </ul>
        </div>
      </div>
    </header>

    {/* --- MOBILE MENU OVERLAY (LỚP PHỦ) --- */}
    {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 md:hidden animate-fade-in">
            {/* Nội dung Menu trượt từ trái sang */}
            <div className="absolute inset-y-0 left-0 w-[80%] bg-white flex flex-col shadow-2xl animate-slide-in-left">
                
                {/* Header Menu Mobile */}
                <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
                    <span className="font-bold text-lg flex items-center gap-2">
                        <Menu className="w-5 h-5" /> Danh mục
                    </span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-white/20 rounded">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body Menu Mobile */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    {/* Thêm nút Admin vào Menu Mobile nếu là Admin */}
                    {isAdmin && (
                        <div className="mb-4">
                            <a 
                                href="/admin"
                                onClick={handleAdminClick} /* Thay thế onClick cũ bằng hàm mới */
                                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold rounded-xl shadow-md cursor-pointer"
                            >
                                <Shield className="w-5 h-5 text-brand-orange" />
                                Vào Trang Quản Trị
                            </a>
                        </div>
                    )}

                    {categories.map((parent) => (
                        <div key={parent.id} className="mb-3 bg-white rounded-xl border border-gray-100 overflow-hidden">
                            {/* Cha */}
                            <div 
                                onClick={() => toggleAccordion(parent.id)}
                                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                            >
                                <span className="font-bold text-gray-800">{parent.name}</span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedCatId === parent.id ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Con (Sổ xuống) */}
                            {expandedCatId === parent.id && (
                                <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
                                    <Link 
                                        href={`/products?cat=${parent.slug}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-2 text-brand-orange font-bold text-sm border-b border-gray-200 mb-1"
                                    >
                                        Xem tất cả {parent.name}
                                    </Link>
                                    <ul className="space-y-1">
                                        {parent.children?.map((child) => (
                                            <li key={child.id}>
                                                <Link 
                                                    href={`/products?cat=${child.slug}`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block py-2 text-sm text-gray-600 hover:text-brand-blue flex items-center gap-2"
                                                >
                                                    <ChevronRight className="w-3 h-3 text-gray-400" /> {child.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    <div className="mt-8">
                        <Link 
                            href="/products"
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="block w-full py-3 bg-brand-orange text-white text-center font-bold rounded-xl shadow-lg"
                        >
                            Xem tất cả sản phẩm
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )}
    </>
  );
}